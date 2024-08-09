from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from openai import OpenAI
import os
import logging
import boto3
from functools import wraps

# Initialize Flask app
app = Flask(__name__)

# Configure CORS
CORS(app, resources={r"/*": {
    "origins": ["http://localhost:3000", "https://greenstickusa.com", "https://www.greenstickusa.com"],
    "methods": ["GET", "POST", "OPTIONS"],
    "allow_headers": ["Content-Type", "Authorization", "x-api-key"]
}})

# Initialize SSM client
ssm = boto3.client('ssm')

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def get_ssm_parameter(param_name):
    try:
        response = ssm.get_parameter(Name=param_name, WithDecryption=True)
        return response['Parameter']['Value']
    except Exception as e:
        logger.error(f"Error retrieving SSM parameter {param_name}: {str(e)}")
        raise

# Get API keys
EXO_API_KEY = get_ssm_parameter('/exo-flask/exo-api-key')
OPENAI_API_KEY = get_ssm_parameter('/exo-flask/openai-api-key')

# Initialize OpenAI client
client = OpenAI(api_key=OPENAI_API_KEY)

def require_api_key(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        api_key = request.headers.get('x-api-key')
        if api_key and api_key == EXO_API_KEY:
            return f(*args, **kwargs)
        else:
            logger.warning("Invalid or missing API key")
            return jsonify({"error": "Invalid or missing API key"}), 401
    return decorated_function

@app.route('/chat', methods=['POST', 'OPTIONS'])
@require_api_key
def chat():
    if request.method == 'OPTIONS':
        return '', 204
    try:
        logger.info("Received POST request to /chat")
        data = request.json
        user_message = data.get('message')
        logger.info(f"User message: {user_message}")

        logger.info("Creating chat completion")
        stream = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are Exo, an AI chatbot that is an expert in finance, including trading stocks, futures, and options. You are a feature of Greenstick, an online platform designed to teach anyone how to trade successfully on the stock market. You can explain financial concepts with great detail and with examples. You can adjust to the experience level of the user, as you act as their personal guide to finance and the stock market."},
                {"role": "user", "content": user_message}
            ],
            stream=True,
        )

        def generate():
            for chunk in stream:
                if chunk.choices[0].delta.content is not None:
                    content = chunk.choices[0].delta.content
                    logger.debug(f"Yielding content: {content}")
                    yield content

        logger.info("Returning streaming response")
        return Response(generate(), content_type='text/plain')

    except Exception as e:
        logger.error(f"Error occurred: {str(e)}", exc_info=True)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
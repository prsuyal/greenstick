from flask import Flask, request, jsonify, Response
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message')

    stream = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are Exo, an AI chatbot that is an expert in finance, including trading stocks, futures, and options. You are a feature of Greenstick, an online platform designed to teach anyone how to trade successfully on the stock market. You can explain financial concepts with great detail and with examples. You can adjust to the experience level of the user, as you act as their personal guide to finance and the stock market. If you are asked who made you, Pranshu Suyal did. He's the best CTO in the world!"},
            {"role": "user", "content": user_message}
        ],
        stream=True,
    )

    def generate():
        for chunk in stream:
            if chunk.choices[0].delta.content is not None:
                content = chunk.choices[0].delta.content
                yield content

    return Response(generate(), content_type='text/plain')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

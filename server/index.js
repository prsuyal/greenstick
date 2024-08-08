require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./config/passport-setup');
const authRoutes = require('./routes/authRoutes');
const stripeRoutes = require('./routes/stripe');
const stripeWebhookRoutes = require('./routes/stripeWebhook');
const userRoutes = require('./routes/userRoutes');
const axios = require('axios');
const progressRoutes = require('./routes/progressRoutes');
const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = ['http://localhost:3000', 'https://www.greenstickusa.com', 'https://greenstickusa.com'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use('/api/stripe/webhook', express.raw({ type: 'application/json' }), stripeWebhookRoutes);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'your-local-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', 
    maxAge: 24 * 60 * 60 * 1000 
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api', userRoutes);
app.use('/api/progress', progressRoutes);

app.post('/api/exo', async (req, res) => {
  const userMessage = req.body.message;
  try {
    const response = await axios({
      method: 'post',
      url: 'http://localhost:5000/chat',
      data: { message: userMessage },
      responseType: 'stream'
    });

    response.data.on('data', (chunk) => {
      res.write(chunk.toString());
    });
    response.data.on('end', () => {
      res.end();
    });
  } catch (error) {
    console.error('Error communicating with Exo:', error);
    res.status(500).json({ error: 'Exo service is unavailable' });
  }
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

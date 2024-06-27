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

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = ['http://localhost:3000', 'https://www.greenstickusa.com'];
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
    secure: false,
    maxAge: 24 * 60 * 60 * 1000 
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api', userRoutes); 

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

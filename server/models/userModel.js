const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const createUser = async (email, password, authProvider, username, fullName, dateOfBirth, tosChecked, mailingListChecked, betaTestingChecked) => {
  const verificationToken = crypto.randomBytes(20).toString('hex');
  try {
    const existingEmail = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingEmail.rows.length > 0) {
      throw new Error('Email already in use');
    }

    const existingUsername = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (existingUsername.rows.length > 0) {
      throw new Error('Username already taken');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const { rows } = await pool.query(
      `INSERT INTO users 
       (email, password, created_at, username, full_name, date_of_birth, current_level, streak, payment_status, subscription_id, plan, auth_provider, stripe_customer_id, tos_checked, mailing_list_checked, beta_testing_checked, verification_token, is_email_confirmed) 
       VALUES ($1, $2, CURRENT_TIMESTAMP, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) 
       RETURNING *;`,
      [email, hashedPassword, username, fullName, dateOfBirth, 1, 0, false, null, null, authProvider, null, tosChecked, mailingListChecked, betaTestingChecked, verificationToken, false]
    );
    return rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const loginUser = async (email, password) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (rows.length === 0) {
      throw new Error('No account found with this email address');
    }
    const user = rows[0];
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Incorrect password');
    }
    if (!user.is_email_confirmed) {
      throw new Error('Email not verified');
    }
    return user;
  } catch (error) {
    throw error;
  }
};

const updateUserPaymentStatus = async (userId, paymentStatus, subscriptionId, plan) => {
  try {
    const { rows } = await pool.query(
      'UPDATE users SET payment_status = $1, subscription_id = $2, plan = $3 WHERE id = $4 RETURNING *;',
      [paymentStatus, subscriptionId, plan, userId]
    );
    return rows[0];
  } catch (error) {
    throw new Error('Failed to update payment status');
  }
};

const updateStripeCustomerId = async (userId, stripeCustomerId) => {
  try {
    const { rows } = await pool.query(
      'UPDATE users SET stripe_customer_id = $1 WHERE id = $2 RETURNING *;',
      [stripeCustomerId, userId]
    );
    return rows[0];
  } catch (error) {
    throw new Error('Failed to update Stripe customer ID');
  }
};

const getUserById = async (userId) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    return rows[0];
  } catch (error) {
    throw new Error('Failed to find user by ID');
  }
};

const getUserByStripeCustomerId = async (stripeCustomerId) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE stripe_customer_id = $1', [stripeCustomerId]);
    return rows[0];
  } catch (error) {
    throw new Error('Failed to find user by Stripe customer ID');
  }
};

const verifyEmail = async (token) => {
  try {
    const { rows } = await pool.query(
      'UPDATE users SET is_email_confirmed = TRUE WHERE verification_token = $1 RETURNING *',
      [token]
    );
    return rows[0];
  } catch (error) {
    throw new Error('Failed to verify email');
  }
};

const findUserByEmail = async (email) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return rows[0];
  } catch (error) {
    throw new Error('Failed to find user by email');
  }
};

const updateVerificationToken = async (email, token) => {
  try {
    const { rows } = await pool.query(
      'UPDATE users SET verification_token = $1 WHERE email = $2 RETURNING *;',
      [token, email]
    );
    return rows[0];
  } catch (error) {
    throw new Error('Failed to update verification token');
  }
};

const findUserByToken = async (token) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE verification_token = $1', [token]);
    return rows[0];
  } catch (error) {
    throw new Error('Failed to find user by token');
  }
};

const updateUserPassword = async (email, password) => {
  try {
    const { rows } = await pool.query(
      'UPDATE users SET password = $1 WHERE email = $2 RETURNING *;',
      [password, email]
    );
    return rows[0];
  } catch (error) {
    throw new Error('Failed to update password');
  }
};


module.exports = {
  createUser,
  loginUser,
  updateUserPaymentStatus,
  updateStripeCustomerId,
  getUserById,
  getUserByStripeCustomerId,
  verifyEmail,
  findUserByEmail,
  updateVerificationToken,
  findUserByToken,
  updateUserPassword 
};
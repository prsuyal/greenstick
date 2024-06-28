const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const createUser = async (email, password, authProvider, username, fullName, dateOfBirth) => {
  try {
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return existingUser.rows[0];
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const { rows } = await pool.query(
      `INSERT INTO users 
       (email, password, created_at, username, full_name, date_of_birth, current_level, streak, payment_status, subscription_id, plan, auth_provider, stripe_customer_id, is_verified, verification_code) 
       VALUES ($1, $2, CURRENT_TIMESTAMP, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) 
       RETURNING *;`,
      [email, hashedPassword, username, fullName, dateOfBirth, 1, 0, false, null, null, authProvider, null, false, verificationCode]
    );
    return rows[0];
  } catch (error) {
    throw new Error('Registration failed, please try again later.');
  }
};


const loginUser = async (email, password) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (rows.length === 0) {
      throw new Error('User not found');
    }
    const user = rows[0];
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Incorrect password');
    }
    return user;
  } catch (error) {
    throw new Error('Login failed, please try again later.');
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

module.exports = {
  createUser,
  loginUser,
  updateUserPaymentStatus,
  updateStripeCustomerId,
  getUserById,
  getUserByStripeCustomerId
};

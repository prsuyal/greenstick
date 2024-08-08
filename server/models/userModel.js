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

const updateUserProgress = async (userId, lessonId, progress) => {
  try {
    const { rows } = await pool.query(
      'INSERT INTO user_progress (user_id, lesson_id, progress) VALUES ($1, $2, $3) ON CONFLICT (user_id, lesson_id) DO UPDATE SET progress = $3, last_updated = CURRENT_TIMESTAMP RETURNING progress',
      [userId, lessonId, progress]
    );
    return rows[0].progress;
  } catch (error) {
    throw new Error('Failed to update user progress');
  }
};

const updateUserXP = async (userId, xp) => {
  try {
    await pool.query(
      'INSERT INTO user_xp (user_id, total_xp) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET total_xp = user_xp.total_xp + $2, last_updated = CURRENT_TIMESTAMP',
      [userId, xp]
    );
  } catch (error) {
    throw new Error('Failed to update user XP');
  }
};

const getUserXP = async (userId) => {
  try {
    const result = await pool.query('SELECT total_xp FROM user_xp WHERE user_id = $1', [userId]);
    return result.rows[0] ? result.rows[0].total_xp : 0;
  } catch (error) {
    throw new Error('Failed to get user XP');
  }
};

const getUserProgress = async (userId, lessonId) => {
  try {
    const result = await pool.query('SELECT progress FROM user_progress WHERE user_id = $1 AND lesson_id = $2', [userId, lessonId]);
    return result.rows[0] ? result.rows[0].progress : 0;
  } catch (error) {
    throw new Error('Failed to get user progress');
  }
};

const encodeQuizProgress = (answers, totalQuestions) => {
  let progress = 0;
  for (let i = 0; i < totalQuestions; i++) {
    if (answers[i] !== undefined) {
      // Add 1 to the answer index because 0 represents unanswered
      progress += (answers[i]) * Math.pow(10, totalQuestions - i - 1);
    }
  }
  return progress;
};

const decodeQuizProgress = (progress, totalQuestions) => {
  const answers = new Array(totalQuestions).fill(undefined);
  for (let i = 0; i < totalQuestions; i++) {
    const digit = Math.floor(progress / Math.pow(10, totalQuestions - i - 1)) % 10;
    if (digit !== 0) {
      // Subtract 1 from the digit to get the original answer index
      answers[i] = digit;
    }
  }
  return answers;
};

const updateQuizProgress = async (userId, quizId, answers, totalQuestions) => {
  const progress = encodeQuizProgress(answers, totalQuestions);
  try {
    const { rows } = await pool.query(
      'INSERT INTO user_progress (user_id, lesson_id, progress) VALUES ($1, $2, $3) ON CONFLICT (user_id, lesson_id) DO UPDATE SET progress = $3, last_updated = CURRENT_TIMESTAMP RETURNING progress',
      [userId, quizId, progress]
    );
    return rows[0].progress;
  } catch (error) {
    throw new Error('Failed to update quiz progress');
  }
};

const getQuizProgress = async (userId, quizId, totalQuestions) => {
  try {
    const { rows } = await pool.query(
      'SELECT progress FROM user_progress WHERE user_id = $1 AND lesson_id = $2',
      [userId, quizId]
    );
    if (rows.length > 0) {
      return decodeQuizProgress(rows[0].progress, totalQuestions);
    }
    return new Array(totalQuestions).fill(undefined);
  } catch (error) {
    throw new Error('Failed to get quiz progress');
  }
};

const getLatestProgress = async (userId) => {
  try {
    const result = await pool.query(
      'SELECT * FROM user_progress WHERE user_id = $1 ORDER BY last_updated DESC LIMIT 1',
      [userId]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Failed to get latest progress');
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
  updateUserPassword,
  updateUserProgress,
  updateUserXP,
  getUserXP,
  getUserProgress,
  updateQuizProgress,
  getQuizProgress,
  encodeQuizProgress,
  decodeQuizProgress,
  getLatestProgress
};
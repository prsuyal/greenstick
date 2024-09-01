const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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

const updateUserProgress = async (userId, lessonId, progress, title, levelNumber, sublevelLetter, lessonNumber) => {
  try {
    console.log('Updating progress with:', { userId, lessonId, progress, title, levelNumber, sublevelLetter, lessonNumber });
    
    const sanitizedLessonId = lessonId || 'default';
    const sanitizedTitle = title || 'Untitled Lesson';
    const sanitizedLevelNumber = levelNumber || 0;
    const sanitizedSublevelLetter = sublevelLetter || 'A';
    const sanitizedLessonNumber = lessonNumber || 0;

    const { rows } = await pool.query(
      `INSERT INTO user_progress 
       (user_id, lesson_id, progress, title, level_number, sublevel_letter, lesson_number, last_updated) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP) 
       ON CONFLICT (user_id, lesson_id) 
       DO UPDATE SET progress = $3, title = $4, level_number = $5, sublevel_letter = $6, lesson_number = $7, last_updated = CURRENT_TIMESTAMP 
       RETURNING *`,
      [userId, sanitizedLessonId, progress, sanitizedTitle, sanitizedLevelNumber, sanitizedSublevelLetter, sanitizedLessonNumber]
    );
    console.log('Query result:', rows[0]);
    return rows[0];
  } catch (error) {
    console.error('Database error:', error.message);
    console.error('Error stack:', error.stack);
    throw new Error(`Failed to update user progress: ${error.message}`);
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

const encodeAnswers = (answers) => {
  return answers.map(answer => answer !== null ? answer.selectedOption + 1 : 0).join(',');
};

const decodeAnswers = (encodedAnswers, questions) => {
  return encodedAnswers.split(',').map((answer, index) => {
      const selectedOptionIndex = parseInt(answer, 10) - 1;
      return selectedOptionIndex >= 0 ? {
          selectedOption: questions[index].options[selectedOptionIndex],
          isCorrect: questions[index].options[selectedOptionIndex].isCorrect
      } : null;
  });
};

const updateQuizProgress = async (userId, quizId, answers, progress, title, levelNumber, sublevelLetter, lessonNumber) => {
  const encodedAnswers = encodeAnswers(answers);
  try {
    const { rows } = await pool.query(
      `INSERT INTO user_quiz_progress 
       (user_id, quiz_id, answers, progress, title, level_number, sublevel_letter, lesson_number, last_updated) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP) 
       ON CONFLICT (user_id, quiz_id) 
       DO UPDATE SET answers = $3, progress = $4, title = $5, level_number = $6, sublevel_letter = $7, lesson_number = $8, last_updated = CURRENT_TIMESTAMP 
       RETURNING *`,
      [userId, quizId, encodedAnswers, progress, title, levelNumber, sublevelLetter, lessonNumber]
    );
    return rows[0];
  } catch (error) {
    console.error('Error updating quiz progress:', error);
    throw new Error('Failed to update quiz progress');
  }
};

const getQuizProgress = async (userId, quizId) => {
  try {
    const { rows } = await pool.query('SELECT * FROM user_quiz_progress WHERE user_id = $1 AND quiz_id = $2', [userId, quizId]);
    if (rows.length > 0) {
      return rows[0];
    }
    return null;
  } catch (error) {
    console.error('Error getting quiz progress:', error);
    throw new Error('Failed to get quiz progress');
  }
};

const getLatestProgress = async (userId) => {
  try {
    console.log('Fetching latest progress for user:', userId);
    const result = await pool.query(
      `SELECT * FROM user_progress 
       WHERE user_id = $1 
       ORDER BY last_updated DESC 
       LIMIT 1`,
      [userId]
    );
    console.log('Query result:', result.rows);
    if (result.rows.length === 0) {
      console.log('No progress found for user');
      return null;
    }
    return result.rows[0];
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to get latest progress');
  }
};

const getLatestQuizProgress = async (userId) => {
  try {
    const result = await pool.query(
      `SELECT *, true as "isQuiz" FROM user_quiz_progress 
       WHERE user_id = $1 
       ORDER BY last_updated DESC 
       LIMIT 1`,
      [userId]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Failed to get latest quiz progress');
  }
};

const deleteUser = async (userId) => {
  try {
    await pool.query('BEGIN');
    const user = await getUserById(userId);

    if (user.stripe_customer_id) {
      try {
        await stripe.customers.del(user.stripe_customer_id);
      } catch (stripeError) {
        console.error('Error deleting Stripe customer:', stripeError);
        if (stripeError.code !== 'resource_missing') {
          throw stripeError;
        }
      }
    }

    await pool.query('DELETE FROM user_progress WHERE user_id = $1', [userId]);

    await pool.query('DELETE FROM user_xp WHERE user_id = $1', [userId]);

    await pool.query('DELETE FROM user_quiz_progress WHERE user_id = $1', [userId]);

    await pool.query('DELETE FROM users WHERE id = $1', [userId]);

    await pool.query('COMMIT');
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error('Error deleting user:', error);
    throw new Error('Failed to delete user');
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
  encodeAnswers,
  decodeAnswers,
  getLatestProgress,
  getLatestQuizProgress,
  deleteUser
};
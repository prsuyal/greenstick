const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const createUser = async (username, fullName, email, password, dateOfBirth) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 12); 
        const { rows } = await pool.query(
            'INSERT INTO users (username, full_name, email, password, date_of_birth, current_level, streak) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;',
            [username, fullName, email, hashedPassword, dateOfBirth, 1, 0]
        );
        return rows[0];
    } catch (error) {
        if (error.code === '23505') {
            throw new Error('Email already in use');
        }
        throw new Error('Registration failed, please try again later.');
    }
};

const loginUser = async (email, password) => {
    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (rows.length === 0) {
            console.log('No user found with that email'); 
            throw new Error('User not found');
        }
        const user = rows[0];
        const isValid = await bcrypt.compare(password, user.password); 
        if (!isValid) {
            console.log('Password does not match'); 
            throw new Error('Incorrect password');
        }
        return user;
    } catch (error) {
        console.error('Error during login:', error.message); 
        throw new Error('Login failed, please try again later.');
    }
};


module.exports = {
    createUser,
    loginUser
};

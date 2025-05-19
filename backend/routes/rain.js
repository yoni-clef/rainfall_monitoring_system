const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const pool = require('../db/connection');
const verifyToken = require('../middleware/verifyToken');

// Insert rain data
router.post('/', verifyToken, [
  body('level').isInt({ min: 0, max: 100 }),
  body('valve_status').isIn(['open', 'closed'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { level, valve_status } = req.body;
    const userId = req.userId;

    const [result] = await pool.query(
      'INSERT INTO rain_data (user_id, level, valve_status) VALUES (?, ?, ?)',
      [userId, level, valve_status]
    );

    res.status(201).json({
      message: 'Rain data recorded successfully',
      data: {
        id: result.insertId,
        level,
        valve_status,
        timestamp: new Date()
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get rain history
router.get('/history', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const [records] = await pool.query(
      'SELECT * FROM rain_data WHERE user_id = ? ORDER BY timestamp DESC',
      [userId]
    );

    res.json({
      message: 'Rain history retrieved successfully',
      data: records
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const [users] = await pool.query(
      'SELECT id, name, email, created_at FROM users WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Profile retrieved successfully',
      data: users[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 
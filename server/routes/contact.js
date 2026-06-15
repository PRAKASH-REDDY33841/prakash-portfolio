import express from 'express';
import { getDbConnection } from '../database/db.js';

const router = express.Router();

// Handle contact form submissions
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  // Simple validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message.' });
  }

  try {
    const db = await getDbConnection();
    const result = await db.run(
      'INSERT INTO messages (sender_name, sender_email, message_text) VALUES (?, ?, ?)',
      [name, email, message]
    );

    res.status(201).json({
      success: true,
      message: 'Message sent successfully!',
      messageId: result.lastID
    });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Internal Server Error. Could not save message.' });
  }
});

// Get all contact form messages (for review)
router.get('/', async (req, res) => {
  try {
    const db = await getDbConnection();
    const messages = await db.all('SELECT * FROM messages ORDER BY created_at DESC');
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal Server Error. Could not fetch messages.' });
  }
});

export default router;

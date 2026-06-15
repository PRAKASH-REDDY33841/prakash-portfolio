import express from 'express';
import { getDbConnection } from '../database/db.js';

const router = express.Router();

// Get all education entries
router.get('/', async (req, res) => {
  try {
    const db = await getDbConnection();
    const education = await db.all('SELECT * FROM education');
    res.json(education);
  } catch (error) {
    console.error('Error fetching education details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;

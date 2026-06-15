import express from 'express';
import { getDbConnection } from '../database/db.js';

const router = express.Router();

// Get all skills
router.get('/', async (req, res) => {
  try {
    const db = await getDbConnection();
    const skills = await db.all('SELECT * FROM skills');
    res.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;

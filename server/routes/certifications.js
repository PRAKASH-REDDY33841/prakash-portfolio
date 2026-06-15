import express from 'express';
import { getDbConnection } from '../database/db.js';

const router = express.Router();

// Get all certifications
router.get('/', async (req, res) => {
  try {
    const db = await getDbConnection();
    const certifications = await db.all('SELECT * FROM certifications');
    res.json(certifications);
  } catch (error) {
    console.error('Error fetching certifications:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;

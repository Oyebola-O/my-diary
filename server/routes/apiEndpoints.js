import express from 'express';
import { postEntries } from '../models/apiMiddleware';
import { getEntries } from '../models/apiMiddleware';
import { modifyEntries } from '../models/apiMiddleware';
import { verifyToken } from '../models/authMiddleware';
const router = express.Router();


// Default page with endpoints
router.get('/', (req, res) => {
  res.render(__dirname + '/howto.mustache');
});

// Create entries
router.post('/entries', verifyToken, postEntries);

// Get entries
router.get('/entries/:id?',verifyToken, getEntries);

// Put entries
router.put('/entries/:id',verifyToken, modifyEntries);

export default router;

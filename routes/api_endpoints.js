import express from 'express';
import {postEntries, getEntries, modifyEntries} from '../middlewares/api_middleware';
import {verifyToken} from '../middlewares/auth_middleware';
const router = express.Router();


// Default page with endpoints
router.get('/api/v1', (req, res) => {
  res.render(__dirname + '/howto.mustache');
});

// Create entries
router.post('/entries', verifyToken, postEntries);

// Get entries
router.get('/entries/:id?',verifyToken, getEntries);

// Put entries
router.put('/entries/:id',verifyToken, modifyEntries);

export default router;

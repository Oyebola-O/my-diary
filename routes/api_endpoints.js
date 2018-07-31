import express from 'express';
import {postEntries, getEntries, modifyEntries} from '../middlewares/api_middleware'
const router = express.Router();


// Default page with endpoints
router.get('/', (req, res) => {
  res.render(__dirname + '/howto.mustache');
});

// Create entries
router.post('/entries', postEntries);

// Get entries
router.get('/entries/:id?', getEntries);

// Put entries
router.put('/entries/:id', modifyEntries);

export default router;

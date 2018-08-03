import express from 'express';
import { validateUser } from '../models/authMiddleware';
import { sendJWT } from '../models/authMiddleware';
import { userExists } from '../models/authMiddleware';
import { createUser } from '../models/authMiddleware';
const auth = express.Router();

// Login Route
auth.post('/login', validateUser, sendJWT);

// Register Route
auth.post('/signup', userExists, createUser);

export default auth;

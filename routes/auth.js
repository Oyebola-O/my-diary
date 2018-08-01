import express from 'express';
import {validateUser, sendJWT, userExists, createUser} from '../middlewares/auth_middleware';
const auth = express.Router();

// Login Route
auth.post('/login', validateUser, sendJWT);

// Register Route
auth.post('/register', userExists, createUser);

export default auth;

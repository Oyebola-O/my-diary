import express from 'express';
import {validateUser, sendJWT, userExists, createUser} from '../middlewares/auth_middleware';
const auth = express.Router();



auth.post('/login', validateUser, sendJWT);

auth.post('/register', userExists, createUser);


export default auth;

import express from 'express';
import jwt from 'jsonwebtoken';
import pool from '../controllers/db';

/* Validates the user */
export const validateUser = (req, res, next) => {
  const {username, password} = req.body;
  // Query string to get a user with the credentials
  const query = `SELECT * FROM public.users WHERE username = '${username}' AND password= '${password}'`;

  pool.query(query, (err, dbres) => {
    if(err){ res.status(404).send({message: "Error accessing database"}) }
    const data = dbres.rows;

    // Checking if a user exists with provided details
    if(data.length == 0){
      res.send({message: "Details are not correct"});
    } else {
      // Passing the username to the next function
      res.locals.passuser = username;
      next();
    }
  });
}


/* Creates JWT and send it */
export const sendJWT = (req, res) => {
  // Getting username from previos middleware
  const user = { username: res.locals.passuser }

  // Encrypting username using jsonwebtokens
  jwt.sign({user}, 'hobo', (err, token) => {
    res.json({ token, message: "token set" })
  });
}


/* Checks if user is already registered */
export const userExists = (req, res, next) => {
  const {username} = req.body;
  const query = `SELECT * FROM public.users WHERE username= '${username}'`;

  pool.query(query, (err, dbres) => {
    if(err){ res.status(404).send({message: "Error accessing database to verify user", err}) }

    // Checking if username is already taken
    const data = dbres.rows;
    if(data.length == 0){
      next();
    } else {
      res.send({message: "This username is already taken"});
    }
  });
}


/* Create a new user and add to database */
export const createUser = (req, res) => {
  const {username, password, name} = req.body;
  const query = `INSERT INTO public.users (username, password, name) VALUES ('${username}', '${password}', '${name}')`;

  // Querying to add user
  pool.query(query, (err, dbres) => {
    if(err){
      res.status(404).send({message: "Error accessing the database to register user", err});
    }
    res.send({message: "An account has been created"});
  });
}


/* Verify JWT */
export const verifyToken = (req, res, next) => {
  // Collects the header value with authorization from request
  const bearerHeader = req.headers['authorization'];

  // Checks if header is defined/ has a value
  if(typeof bearerHeader !== 'undefined'){
    // Extracting the token from the header
    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken; next();
  } else {
    res.status(403).send({message: "Forbidden, you are not authorized to access this content"});
  }
}

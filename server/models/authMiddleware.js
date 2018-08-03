import express from 'express';
import jwt from 'jsonwebtoken';
import pool from '../controllers/db';
import {validate} from '../helpers/auxiliary';

/* Validates the user */
export const validateUser = (req, res, next) => {
  const {username, password} = req.body;

  // Check if input are valid
  const code = validate(username);
  const code1 = validate(password);
  if(code == 1 || code1 == 1){
    res.status(404).send({message: "You must enter a valid value for both your username and password", status: 404});
  } else {
    // Query string to get a user with the credentials
    const query = `SELECT * FROM public.users WHERE username = '${username}' AND password= '${password}'`;

    pool.query(query, (err, dbres) => {
      if(err){ res.status(404).send({message: "Error accessing database",status: 404, err}) }
      const data = dbres.rows;

      // Checking if a user exists with provided details
      if(data.length == 0){
        res.status(404).send({message: "Details are not correct", status: 404});
      } else {
        // Passing the username to the next function
        res.locals.passuser = username;
        next();
      }
    });
  }
}


/* Creates JWT and send it */
export const sendJWT = (req, res) => {
  // Getting username from previos middleware
  const user = { username: res.locals.passuser }

  // Encrypting username using jsonwebtokens
  jwt.sign({user}, 'hobo', (err, token) => {
    res.json({ token, message: "token sent", status: 200})
  });
}


/* Checks if user is already registered */
export const userExists = (req, res, next) => {
  const {username, password, name} = req.body;
  const query = `SELECT * FROM public.users WHERE username= '${username}'`;

  // Check if input are valid
  const code = validate(username);
  const code1 = validate(password);
  const code2 = validate(name);
  if(code == 1 || code1 == 1 || code2 == 1){
    res.status(404).send({message: "You must enter a valid value for both your username and password and name", status: 404});
  } else {

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
    res.status(201).send({message: "An account has been created", details: {username, password, name}, status:201});
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
    res.status(403).send({message: "Forbidden, you are not authorized to access this content", status:403});
  }
}

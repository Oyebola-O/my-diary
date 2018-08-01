import express from 'express';
import jwt from 'jsonwebtoken';
import pool from '../db/db.js';

/* Validates the user */
export function validateUser(req, res, next){
  const {username, password} = req.body;
  const query = "SELECT * FROM public.users WHERE username LIKE " + "'" + username + "%' AND password LIKE "  + "'" + password + "%'";

  pool.query(query, (err, dbres) => {
    if(err){ res.status(404).send({message: "Error accessing database"}) }
    const data = dbres.rows;

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
export function sendJWT(req, res){
  const user = { username: res.locals.passuser }

  jwt.sign({user}, 'hobo', (err, token) => {
    res.json({ token, message: "done" })
  });
}


/* Checks if user is already registered */
export function userExists(req, res, next){
  const {username} = req.body;
  const query = "SELECT * FROM public.users WHERE username LIKE " + "'" + username + "%'";

  pool.query(query, (err, dbres) => {
    if(err){ res.status(404).send({message: "Error accessing database"}) }

    const data = dbres.rows;
    if(data.length == 0){
      next();
    } else {
      res.send({message: "This username is already taken"});
    }
  });
}


/* Create a new user and add to database */
export function createUser(req, res){
  const {username, password, name} = req.body;
  const query = "INSERT INTO public.users (username, password, name) VALUES (" + "'" + username + "'" + ",'" + password + "'," + "'" + name + "')RETURNING *";

  pool.query(query, (err, dbres) => {
    if(err){
      res.status(404).send({message: "Error accessing the database"});
    }
    res.send({message: "An account has been created"});
  });
}


/* Verify JWT */
export function verifyToken(req, res, next){
  const bearerHeader = req.headers['authorization'];

  if(typeof bearerHeader !== 'undefined'){
    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken; next();
  } else {
    res.status(403).send({message: "Forbidden"});
  }
}

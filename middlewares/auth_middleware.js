import express from 'express';
import jwt from 'jsonwebtoken';
import pool from '../db/db.js';

// Login
export function validateUser(req, res, next){
  const {username, password} = req.body;
  const query = "SELECT * FROM public.users WHERE username LIKE " + "'" + username + "%' AND password LIKE "  + "'" + password + "%'";

  pool.query(query, (err, dbres) => {
    if(err){
      res.status(404).send({message: "There was an error accessing the database, please try again later"});
    }
    const data = dbres.rows;

    if(data.length == 0){
      res.send({message: "Your details are not correct"});
    } else {
      next();
    }

    // pool.end();
  });
}
export function sendJWT(req, res){
  // TODO: Implement JWT
  res.send({message: "No errors so far"});
  // const user = {id: 3}
  // const token = jwt.sign({user}, 'key');
  // res.json({token: token});
}


// Register
export function userExists(req, res, next){
  const {username} = req.body;
  const query = "SELECT * FROM public.users WHERE username LIKE " + "'" + username + "%'";
  pool.query(query, (err, dbres) => {
    if(err){
      res.status(404).send({message: "There was an error accessing the database, please try again later"});
    }

    const data = dbres.rows;

    if(data.length == 0){
      next();
    } else {
      res.send({message: "This username is already taken"});
    }

  });
}

export function createUser(req, res){
  const {username, password, name} = req.body;
  const query = "INSERT INTO public.users (username, password, name) VALUES (" + "'" + username + "'" + ",'" + password + "'," + "'" + name + "')RETURNING *";

  pool.query(query, (err, dbres) => {
    if(err){
      res.status(404).send({message: "There was an error accessing the database, please try again later"});
    }
    res.send({message: "An account has been created"});
  });
}

import express from 'express';
import pool from '../controllers/db';
import jwt from 'jsonwebtoken';
import {getTheDate, checkOwner} from '../helpers/auxiliary';


// Create entries in the database
export const postEntries = (req, res) => {
  // Verify and decrypt token to get user
  jwt.verify(req.token, 'hobo', (err, data) => {
    if(err){
      res.status(403).send({message: "Forbidden, you are not authorized to access this content", err});
    } else {
      // Extract data to create query
      const current_user = data["user"]["username"];
      const {title, text} = req.body;
      const date = getTheDate();
      // Query string
      const query = `INSERT INTO public.entries(username, title, text, date) VALUES ('${current_user}', '${title}', '${text}', '${date}')`;

      // Query database to post entry
      pool.query(query, (err) => {
        if(err){
          res.status(404).send({message: "There was an error, could not add entry to the database", err});
        } else {
          res.status(201).send({message: "An entry has been created"});
        }
      });
    }
  });
}


// Get entries from the database
export const getEntries = (req, res) => {
  // Verify and decrypt token to get user
  jwt.verify(req.token, 'hobo', (err, data) => {
    if(err){
      res.status(403).send({message: "Forbidden, you are not authorized to access this content"});
    } else {
      // Extract data to create query
      const current_user = data["user"]["username"];
      const id = req.params.id;
      // Query string
      const query = `SELECT * FROM public.entries WHERE username = '${current_user}'`;

      // Query database to get entry
      pool.query(query, (err, dbres) => {
        if(err){ res.status(404).send({message: "Error accessing database", err}) }
        const entries = dbres.rows;

        // To get all entries
        if(!id){
          res.send(entries)
        } else {
          // To get a single entry
          let [userOwnsId, index] = checkOwner(entries, id);
          if(userOwnsId){
            res.send(entries[index]);
          } else {
            res.send({message: "You don't have an entry with that id"});
          }
        }
      });
    }
  });
}


// Modify entries in the database
export const modifyEntries = (req, res) => {
  // Verify and decrypt token to get user
  jwt.verify(req.token, 'hobo', (err, data) => {
    if(err){
      res.status(403).send({message: "Forbidden, you are not authorized to access this content"});
    } else {
      // Extract data to create query
      const current_user = data["user"]["username"];
      const id = req.params.id;
      const {title, text} = req.body;
      const todays_date = getTheDate();

      // Query string
      const query = `SELECT date FROM public.entries WHERE id = ${id} AND username = '${current_user}'`;
      pool.query(query, (err, dbres) => {
        if(err){ res.status(404).send({message: "Error accessing database", err})}

        // Check if id is valid
        if(dbres.rows.length == 0){ res.send({message: "You do not have an entry with that id"})}

        // Checking if entry was made on the same day
        if(dbres.rows[0]['date'] == todays_date){
          // Setting query to update entry
          const query1 = `UPDATE public.entries SET title= '${title}', text= '${text}' WHERE id= ${id} AND username= '${current_user}'`;
          pool.query(query1, (err, dbres1) => {
            if(err){res.status(404).send({message: "Error accessing database to update entry", err})}
            else { res.send({message: "Entry updated"}) }
          });
          // Send if entry not on the same day
        } else {
          res.send({message: "You can't edit this entry anymore"});
        }
      });
    }
  });
}

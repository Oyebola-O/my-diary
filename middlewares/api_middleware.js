import express from 'express';
import pool from '../db/db.js';
import jwt from 'jsonwebtoken';
import {getTheDate, checkOwner} from '../middlewares/auxiliary';


// Create entries in the database
export function postEntries(req, res){
  jwt.verify(req.token, 'hobo', (err, data) => {
    if(err){
      res.status(403).send({message: "Forbidden", err});
    } else {
      const current_user = data["user"]["username"];
      const {title, text} = req.body;
      const date = getTheDate();
      const query = "INSERT INTO public.entries(username, title, text, date) VALUES ('" + current_user + "','" + title + "','" + text + "','" + date + "')";

      pool.query(query, (err) => {
        if(err){
          res.send({message: "Could not add entry"});
        } else {
          res.status(201).send({message: "An entry has been created"});
        }
      });
    }
  });
}


// Get entries from the database
export function getEntries(req, res){
  jwt.verify(req.token, 'hobo', (err, data) => {
    if(err){
      res.status(403).send({message: "Forbidden"});
    } else {
      const current_user = data["user"]["username"];
      const id = req.params.id;
      const query = "SELECT * FROM public.entries WHERE username LIKE " + "'" + current_user + "%'";

      pool.query(query, (err, dbres) => {
        if(err){ res.status(404).send({message: "Error accessing database"}) }
        const entries = dbres.rows;

        if(!id){
          res.send(entries)
        } else {

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
export function modifyEntries(req, res){
  jwt.verify(req.token, 'hobo', (err, data) => {
    if(err){
      res.status(403).send({message: "Forbidden"});
    } else {
      const current_user = data["user"]["username"];
      const id = req.params.id;
      const {title, text} = req.body;
      const todays_date = getTheDate();

      const query = "SELECT date FROM public.entries WHERE id = " + id + "AND username = " + "'" + current_user + "'";
      pool.query(query, (err, dbres) => {
        if(err){ res.status(404).send({message: "Error accessing database"})}

        // Check if id is valid
        if(dbres.rows.length == 0){ res.send({message: "You do not have an entry with that id"})}

        if(dbres.rows[0]['date'] == todays_date){
          const query1 = "UPDATE public.entries SET title= '" + title + "', text= '" + text + "' " + "WHERE id = "  + id + " AND username = '" + current_user + "'";
          pool.query(query1, (err, dbres1) => {
            if(err){res.status(404).send({message: "Error accessing database, Update"})}
            else { res.send({message: "Entry updated"}) }
          });

        } else {
          res.send({message: "You can't edit this entry anymore"});
        }
      });
    }
  });
}

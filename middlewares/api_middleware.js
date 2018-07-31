import express from 'express';
import pool from '../db/db.js';

const entries = [
  { id: 0, title: 'Title 0', text: 'Text 0' },
  { id: 1, title: 'Title 1', text: 'Text 1' },
  { id: 2, title: 'Title 2', text: 'Text 2' }
];


// Create entries in the database
export function postEntries(req, res){
  const {title, text} = req.body;
  const id = entries.length;

  const entry = {id, title, text,};

  entries[id] = entry;

  res.status(201);
  res.send(
    {
      message: 'An entry has been created',
      details: entry,
      entries,
    },
  );
}

// Get entries from the database
export function getEntries(req, res){
  const id = req.params.id;
    if (!id) {
      res.send(entries);
    } else {
      // Corner case
      if (id >= 0 && id < entries.length) {
        res.send(entries[id]);
      } else {
        res.status(404);
        res.send({ message: "Error, there's no entry with that id" });
      }
    }
}

// Modify entries in the database
export function modifyEntries(req, res){
  const id = Number(req.params.id);
  if (id >= 0 && id < entries.length) {
    const title = req.body.title;
    const text = req.body.text;

    entries[id].title = title;
    entries[id].text = text;

    res.send(entries[id]);
  } else {
    res.status(404);
    res.send({ message: "Error, there's no entry with that id" });
  }
}

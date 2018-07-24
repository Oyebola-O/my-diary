import express from 'express';
import bodyParser from "body-parser";
const router = express.Router();
let entries = [];




// Create entries
router.post('/api/v1/entries', (req, res) =>{
  let title = req.body.title;
  let text = req.body.text;
  let id = entries.length;

  let entry = {
    id: id,
    title: title,
    text: text
  }

  res.send(
    {
    message: "An entry has been created",
    details: entry
  });
  res.status(200).end();
});


export default router;

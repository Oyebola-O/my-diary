import express from 'express';

const router = express.Router();
const entries = [
  { id: 0, title: 'Title 0', text: 'Text 0' },
  { id: 1, title: 'Title 1', text: 'Text 1' },
];


// Create entries
router.post('/api/v1/entries', (req, res) => {
  const title = req.body.title;
  const text = req.body.text;
  const id = entries.length;

  const entry = {
    id,
    title,
    text,
  };

  res.send(
    {
      message: 'An entry has been created',
      details: entry,
    },
  );
  res.status(200).end();
});


// Get entries
router.get('/api/v1/entries/:id?', (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.send(entries);
  } else {
    // TODO: Case 2, when there is an id
    if(id >= 0 && id < entries.length){
      res.send(entries[id]);
    } else {
      res.status(404);
      res.send({message: "Error, there's no entry with that id"});
    }
  }
});


export default router;

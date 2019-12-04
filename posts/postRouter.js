const express = require('express');

const db = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  db
    .get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error retrieving the posts' })
    })
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  db
    .getById(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error retrieving the posts' });
    })
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  db
    .remove(req.params.id)
    .then(num => {
      res.status(200).json(num);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error deleting the post' });
    })
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
  db
    .insert(req.body)
    .then(newPost => {
      res.status(200).json(newPost);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error adding new post' })
    })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  if(!req.body || !req.body.text){
    res.status(400).json({ message: 'missing required text field' });
  } else {
    next();
  }
}

module.exports = router;

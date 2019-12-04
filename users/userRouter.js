const express = require('express');

const userdb = require('./userDb');
const postdb = require('../posts/postDb')

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  userdb
    .insert(req.body)
    .then(newUser => {
      res.status(200).json(newUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'error creating new user' });
    })
  
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  console.log('here2');
  //console.log(req.user);
  postdb
    .insert(req.body)
    .then(num => {
      res.status(200).json(num);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'error adding new post to user' });
    })
});

router.get('/', (req, res) => {
  // do your magic!
  userdb
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'error retrieving list of users' });
    })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  userdb
    .getById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'error retrieving user' });
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  userdb
    .getUserPosts(req.params.id)
    .then(userPosts => {
      res.status(200).json(userPosts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'error retrieving user comments' })
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  userdb
    .remove(req.params.id)
    .then(num => {
      res.status(200).json(num);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'error deleting' })
    })
});

router.put('/:id', (req, res) => {
  // do your magic!
  userdb
    .update(req.params.id, req.body)
    .then(num => {
      res.status(200).json(num);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'error updating user' })
    })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  userdb
    .getById(req.params.id)
    .then(user => {
      req.user = user.id;
      next();
    })
    .catch(err => {
      console.log(err, 'validate user id');
      res.status(500).json({ message: 'error retrieving user by id' });
    })
}

function validateUser(req, res, next) {
  // do your magic!
  if(!req.body || !req.body.name){
    res.status(400).json({ message: 'missing required name field' })
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
  console.log('here1');
  if(!req.body || !req.body.text){
    res.status(400).json({ message: 'missing required text field' });
  } else {
    next();
  }
}

module.exports = router;

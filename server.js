const express = require('express');
const helmet = require('helmet');

const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

const server = express();


server.use(express.json());
server.use(logger);

server.use('/posts', helmet(), postRouter);
server.use('/users', helmet(), userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const d = new Date();
  console.log(`${req.method} to ${req.originalUrl} at ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`)

  next();
}

module.exports = server;

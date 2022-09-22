const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const usersRoutes = require('./routes/users-routes');
const booksRoutes = require('./routes/books-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  next();
});

app.use('/api/books', booksRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});
// mongodb://shanmugam:9EJ3Fb9SB43QHYAG@testclustor-shard-00-02.vlchj.mongodb.net:27017,testclustor-shard-00-00.vlchj.mongodb.net:27017,testclustor-shard-00-01.vlchj.mongodb.net:27017/mean?ssl=true&replicaSet=Main-shard-0&authSource=admin&retryWrites=true
mongoose
  .connect(
    `mongodb+srv://shanmugam:9EJ3Fb9SB43QHYAG@testclustor.vlchj.mongodb.net/mean?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log('CONNECTED Successfully');
    app.listen(8080);
  })
  .catch(err => {
    console.log('Unable to connect the MongoDB Database 123');
    console.log(err);
  });
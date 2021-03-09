// Core dependencies
const express = require('express');
const morgan = require('morgan');
// Third party dependencies
const app = express();
// My dependencies
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// MiddleWare
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  console.log('This is middleware');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;

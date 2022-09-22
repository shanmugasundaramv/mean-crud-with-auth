const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
    console.log("****** token ", token);
    if (!token) {
      throw new Error('Authentication failed!1');
    }
    const decodedToken = jwt.verify(token, 'supersecret_dont_share');
    console.log("****** decodedToken ", decodedToken);
    req.userData = { id: decodedToken.id };
    next();
  } catch (err) {
    const error = new HttpError('Authentication failed!2', 403);
    return next(error);
  }
};

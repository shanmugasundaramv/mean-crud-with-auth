const express = require('express');
const { check } = require('express-validator');

const usersController = require('../controllers/users-controllers');

const router = express.Router();

router.get('/', usersController.getUsers);

router.post(
  '/register',
  [
    check('userName')
      .not()
      .isEmpty(),
    check('emailId')
      .normalizeEmail({ gmail_remove_dots: false })
      .isEmail(),
    check('password').isLength({ min: 6 })
  ],
  usersController.register
);

router.post('/login', usersController.login);

module.exports = router;

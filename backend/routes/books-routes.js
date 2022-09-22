const express = require('express');
const { check } = require('express-validator');

const booksControllers = require('../controllers/books-controllers');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/', booksControllers.getBooks);

router.get('/:id', booksControllers.getBookById);

router.use(checkAuth);

router.post(
  '/createBook',
  [
    check('bookName')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 })
  ],
  booksControllers.createBook
);

// router.post(
//   '/createBook/:bookId',
//   [
//     check('bookName')
//       .not()
//       .isEmpty(),
//     check('description').isLength({ min: 5 })
//   ],
//   booksControllers.updateBook
// );

router.put(
  '/updateBook/:bookId',
  [
    check('bookName')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 })
  ],
  booksControllers.updateBook
);

router.delete('/:id', booksControllers.deleteBook);

module.exports = router;

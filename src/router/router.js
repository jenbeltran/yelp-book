//strict mode
'use strict';

//Adding Express
let express = require('express');

// Create instance of an express router
let router = express.Router();

//Adding method override to override POST requests for PUT requests
let methodOverride = require('method-override');
router.use(methodOverride('_method'));

//Adding authentication route functions
let loginRoute = require('./authentication/login');
let registerRoute = require('./authentication/register');

//Adding book route functions
let landingRoute = require('./books/landing');
let allBooksRoute = require('./books/books');
let newBookRoute = require('./books/newBook');
let showBookDetailsRoute = require('./books/showBookDetails');
let updateBookDetailsRoute = require('./books/updateBook');
let deleteBookRoute = require('./books/deleteBook');

/**
 * Define routes
 */

// Login Page
router.get('/login', loginRoute.get);

// Register Page
router.get('/register', registerRoute.get);

// Landing page
router.get('/', landingRoute.get);

// See All Books
router.get('/books', allBooksRoute.get);

// Add new book to the database
router.get('/books/new', newBookRoute.get);
router.post('/books', newBookRoute.post);

// See book details
router.get('/books/:id', showBookDetailsRoute.get);

// Update a current book details
router.get('/books/:id/edit', updateBookDetailsRoute.get);
router.put('/books/:id', updateBookDetailsRoute.put);

// Deletes a book in the DB
router.delete('/books/:id', deleteBookRoute.delete);

module.exports = router;

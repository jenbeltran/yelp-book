//strict mode
'use strict';

//connecting the required libraries etc.
const express = require('express');
const router = express.Router();

//LANDING PAGE
//INDEX route
router.get('/', function(req, res) {
	res.render('landing');
});

//SEE ALL BOOKS
//INDEX route
router.get('/books', function(req, res) {
	res.render('books');
});

//ADD A NEW BOOK
//NEW route - shows the new book form
router.get('/books/new', function(req, res) {
	res.render('newBookForm');
});
//TODO://CREATE route - creates the new book and redirects to all books page
// router.post('/books', function(req, res) {
// 	res.redirect('/books');
// });

//SEE BOOK DETAILS
//SHOW route
router.get('/books/:id', function(req, res) {
	res.render('showBookDetails');
});

//UPDATE A CURRENT BOOK
//TODO://EDIT route - shows the edit book form
// router.get('/books/:id', function(req, res) {
// 	res.render('edit');
// });
//TODO://UPDATE route - updates the book and redirects to all books page

//DELETE A CURRENT BOOK
//TODO://DELETE route - deletes the book and redirects to all books page
// router.delete('/books/:id', function(req, res) {
// 	res.redirect('/books');
// });

// LOGIN ROUTE
router.get('/login', function(req, res) {
	res.render('login');
});
//TODO: check if user is in db, if so, then continue to secret INDEX page
//if not, then refresh the login page

//REGISTER ROUTE
router.get('/register', function(req, res) {
	res.render('register');
});
//TODO: add the user to the db, then continue to secret INDEX page

//export
module.exports = router;

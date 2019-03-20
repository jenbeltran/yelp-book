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

//SEE BOOK DETAILS
//SHOW route
router.get('/books/:id', function(req, res) {
	res.render('showBookDetails');
});

//ADD A NEW BOOK REVIEW COMMENT
//NEW route - shows the new comment form
router.get('/books/new', function(req, res) {
	res.render('newCommentForm');
});

//TODO://CREATE route - creates the new book review and redirects to '/books/:id'
// router.post('/books/:id'', function(req, res) {
// 	res.redirect('/books/:id);
// });

//UPDATE A CURRENT BOOK REVIEW
//TODO://EDIT route - shows the edit book review form
// router.get('/books/:id', function(req, res) {
// 	res.render('edit');
// });

//TODO://UPDATE route - updates the book and redirects to /books/:id' page

//DELETE A CURRENT BOOK REVIEW
//TODO://DELETE route - deletes the book review and redirects to all books page
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

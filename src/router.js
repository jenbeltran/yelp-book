//strict mode
'use strict';

//connecting the required libraries etc.
const express = require('express');
const router = express.Router();
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('database/books.sqlite');

///////////////////////// AUTHENTICATION ROUTES //////////////////////////
// LOGIN ROUTE
router.get('/login', function(req, res) {
	res.render('authentication/login');
});
//TODO: check if user is in db, if so, then continue to secret INDEX page
//if not, then refresh the login page

//REGISTER ROUTE
router.get('/register', function(req, res) {
	res.render('authentication/register');
});
//TODO: add the user to the db, then continue to secret INDEX page

///////////////////////// BOOK ROUTES //////////////////////////
//LANDING PAGE
//INDEX route
router.get('/', function(req, res) {
	res.render('books/landing');
});

//SEE ALL BOOKS
//INDEX route
router.get('/books', (req, res) => {
	db.all('SELECT * FROM books', function(err, bookData) {
		// res.render('books/books');
		res.send(bookData);
	});
});

//ADD A NEW BOOK
//NEW route - shows the new book form
router.get('/books/new', function(req, res) {
	res.render('books/newBookForm');
});

//CREATE route - creates the new book and redirects to all books page
router.post('/books', function(req, res) {
	book.create(req.body.book, (err, newBook) => {
		if (err) {
			res.render('books/newBookForm');
		} else {
			res.redirect('/books');
		}
	});
});

//SEE BOOK DETAILS
//SHOW route
router.get('/books/:id', function(req, res) {
	res.render('books/showBookDetails');
});

//UPDATE A CURRENT BOOK
//TODO://EDIT route - shows the edit book form

//TODO://UPDATE route - updates the book and redirects to all books page

//DELETE A CURRENT BOOK
//TODO://DELETE route - deletes the book and redirects to all books page

//////////////////////////////////////// COMMENT ROUTES ///////////////////////
//ADD A NEW BOOK REVIEW COMMENT
//NEW route - shows the new comment form
// router.get('/books/new', function(req, res) {
// 	res.render('commentForm');
// });

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

//export
module.exports = router;

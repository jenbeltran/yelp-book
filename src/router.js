//strict mode
'use strict';

//connecting the required libraries etc.
let express = require('express'),
	router = express.Router(),
	sqlite3 = require('sqlite3').verbose(),
	db = new sqlite3.Database('database/books.sqlite'),
	bodyParser = require('body-parser'),
	urlencodedParser = bodyParser.urlencoded({ extended: false }),
	methodOverride = require('method-override');

router.use(methodOverride('_method'));

///////////////////////// AUTHENTICATION ROUTES //////////////////////////
// LOGIN ROUTE
router.get('/login', (req, res) => {
	res.render('authentication/login');
});
//TODO: check if user is in db, if so, then continue to secret INDEX page
//if not, then refresh the login page

//REGISTER ROUTE
router.get('/register', (req, res) => {
	res.render('authentication/register');
});
//TODO: add the user to the db, then continue to secret INDEX page

///////////////////////// BOOK ROUTES //////////////////////////
//LANDING PAGE
//INDEX route
router.get('/', (req, res) => {
	res.render('books/landing');
});

//SEE ALL BOOKS
//INDEX route
router.get('/books', (req, res) => {
	db.all('SELECT * FROM books', (err, bookData) => {
		res.render('books/books', {
			bookData : bookData
		});
	});
});

//ADD A NEW BOOK
//NEW route - shows the new book form
router.get('/books/new', (req, res) => {
	res.render('books/newBookForm');
});

//CREATE route - creates the new book and redirects to all books page
router.post('/books', urlencodedParser, (req, res) => {
	db.run(
		'INSERT INTO books(title, author_fname, author_lname, category, release_year, pages, price, picture) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
		[
			req.body.title,
			req.body.author_fname,
			req.body.author_lname,
			req.body.category,
			req.body.release_year,
			req.body.pages,
			req.body.price,
			req.body.picture
		]
	);
	res.redirect('/books');
});

//SEE BOOK DETAILS
//SHOW route
router.get('/books/:id', urlencodedParser, (req, res) => {
	db.all('SELECT * FROM books WHERE book_id =?', [ req.params.id ], (err, bookData) => {
		res.render('books/showBookDetails', {
			bookData : bookData
		});
	});
});

//UPDATE A CURRENT BOOK
//EDIT route - shows the edit book form
router.get('/books/:id/edit', urlencodedParser, (req, res) => {
	db.all('SELECT * FROM books WHERE book_id =?', [ req.params.id ], (err, bookData) => {
		res.render('books/editBookForm', {
			bookData : bookData
		});
	});
});

//TODO://UPDATE route - updates the book and redirects to all books page
router.post('/books/:id', urlencodedParser, (req, res) => {
	db.run(
		'UPDATE books SET title =?, author_fname=?, author_lname=?, category=?, release_year=?, pages=?, price=?, picture=? WHERE book_id=?',
		[
			req.body.title,
			req.body.author_fname,
			req.body.author_lname,
			req.body.category,
			req.body.release_year,
			req.body.pages,
			req.body.price,
			req.body.picture
		]
	);
	res.redirect(`/books/${req.params.id}`);
});

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

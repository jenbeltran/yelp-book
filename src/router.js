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
//REGISTER ROUTE
router.get('/register', (req, res, err) => {
	try {
		res.render('authentication/register');
	} catch (err) {
		res.render('errorPage');
	}
});
//TODO: add the user to the db, then continue to secret INDEX page

// LOGIN ROUTE
router.get('/login', (req, res, err) => {
	try {
		res.render('authentication/login');
	} catch (err) {
		res.render('errorPage');
	}
});
//TODO: check if user is in db, if so, then continue to secret INDEX page
//if not, then refresh the login page

///////////////////////// BOOK ROUTES //////////////////////////
//LANDING PAGE
//INDEX route
router.get('/', (req, res, err) => {
	try {
		res.render('books/landing');
	} catch (err) {
		res.render('errorPage');
	}
});

//SEE ALL BOOKS
//INDEX route
router.get('/books', (req, res) => {
	db.all('SELECT * FROM books', (err, bookData) => {
		if (err) next(err);
		else {
			res.render('books/books', {
				bookData : bookData
			});
		}
	});
});

//ADD A NEW BOOK
//NEW route - shows the new book form
router.get('/books/new', (req, res, err) => {
	try {
		res.render('books/newBookForm');
	} catch (err) {
		res.render('errorPage');
	}
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
		],
		(err) => {
			if (err) next(err);
			else {
				res.redirect('/books');
			}
		}
	);
});

//SEE BOOK DETAILS AND COMMENTS
//SHOW route
router.get('/books/:id', urlencodedParser, (req, res) => {
	db.all('SELECT * FROM books WHERE book_id =?', [ req.params.id ], (err, bookData) => {
		if (err) next(err);
		else {
			res.render('books/showBookDetails', {
				bookData : bookData
			});
		}
	});
});

//UPDATE A CURRENT BOOK
//EDIT route - shows the edit book form
router.get('/books/:id/edit', urlencodedParser, (req, res) => {
	db.all('SELECT * FROM books WHERE book_id =?', [ req.params.id ], (err, bookData) => {
		if (err) next(err);
		else {
			res.render('books/editBookForm', {
				bookData : bookData
			});
		}
	});
});

//UPDATE route - updates the book and redirects to book details page
router.put('/books/:id', urlencodedParser, (req, res) => {
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
			req.body.picture,
			req.params.id
		],
		(err) => {
			if (err) next(err);
			else {
				res.redirect(`/books/${req.params.id}`);
			}
		}
	);
});

//DELETE A CURRENT BOOK
//DELETE route - deletes the book and redirects to all books page
router.delete('/books/:id', urlencodedParser, (req, res) => {
	db.run('DELETE FROM books WHERE book_id =?', [ req.params.id ], (err) => {
		if (err) next(err);
		else {
			res.redirect('/books');
		}
	});
});

//Design purposes only - error page
router.get('/oops', (req, res) => {
	res.render('errorPage');
});

//export
module.exports = router;

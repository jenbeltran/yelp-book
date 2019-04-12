//strict mode
'use strict';

//connecting the required libraries etc.
let express = require('express'),
	session = require('express-session'),
	router = express.Router(),
	bodyParser = require('body-parser'),
	sqlite3 = require('sqlite3').verbose(),
	db = new sqlite3.Database('database/books.sqlite'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	urlencodedParser = bodyParser.urlencoded({ extended: false }),
	methodOverride = require('method-override'),
	cookieParser = require('cookie-parser'),
	flash = require('connect-flash'),
	passportMiddleWare = require('../middleware/passport');

// TODO: figure out why passport middleware is not connecting

router.use(cookieParser);

router.use(
	session({
		secret            : 'justasecret',
		resave            : true,
		saveUninitialized : true
	})
);

//Passport config
router.use(passport.initialize());
router.use(passport.session());

//Flash
router.use(flash());

// to use PUT and DELETE requests
router.use(methodOverride('_method'));

///////////////////////// AUTHENTICATION ROUTES //////////////////////////
//REGISTER ROUTE
//NEW route - shows the register form
router.get('/register', (req, res, err) => {
	res.render('authentication/register', { message: req.flash('signupMessage') });
});

//CREATE route - creates the new user and redirects to all books page
// router.post('/register', urlencodedParser, (req, res) => {
// 	bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
// 		db.run(
// 			'INSERT INTO users(username, password, user_fname, user_lname, email) VALUES(?, ?, ?, ?, ?)',
// 			[ req.body.username, hash, req.body.user_fname, req.body.user_lname, req.body.email ],
// 			(err) => {
// 				if (err) next(err);
// 				else {
// 					res.redirect('/books');
// 				}
// 			}
// 		);
// 	});
// });

router.post(
	'/register',
	passport.authenticate('local-signup', {
		successRedirect : '/books',
		failureRedirect : '/register',
		failureFlash    : true
	})
);

//TODO: ensure passwords match, hide register button and login buttons on ejs

// LOGIN ROUTE
//NEW route - shows the login form
router.get('/login', (req, res, err) => {
	res.render('authentication/login', { message: req.flash('loginMessage') });
});

//TODO: redirect to book page AND authenticate the hash password
//POST route - confirms the user's info and redirects to secret page

router.post(
	'/login',
	passport.authenticate('local-login', {
		successRedirect : '/books',
		failureRedirect : '/login',
		failureFlash    : true
	}),
	function(req, res) {
		if (req.body) {
			req.session.cookie.maxAge = 1000 * 60 * 3;
		} else {
			req.session.cookie.expires = false;
		}
		// If this function gets called, authentication was successful.
		// `req.user` contains the authenticated user.
		res.redirect('/books');
	}
);

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

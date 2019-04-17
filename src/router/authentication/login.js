//strict mode
'use strict';

//Adding SQLite DB
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('database/books.sqlite');

//Adding bcrypt
const bcrypt = require('bcrypt');

// LOGIN ROUTE
//NEW route - shows the login form
function getLoginRoute(req, res) {
	res.render('authentication/login', {
		pageId : 'login',
		title  : 'YelpBook | Login'
	});
}

// POST route - checks DB to ensure user is on file
function postLoginRoute(req, res, next) {
	// pull password from database
	db.all('SELECT password FROM users where username=?', [ req.body.username ], (err, dbHash) => {
		if (err) next(err);
		else {
			//compare hashed password from database to hashed req.body.password in form
			return bcrypt.compare(req.body.password, dbHash[0].password).then((isValid) => {
				// If invalid respond with authentication failure
				if (!isValid) {
					res.redirect('/login');
					// Else log the user in and redirect to home page
				} else {
					req.session.username = req.body.username;
					res.redirect('/books');
				}
				console.log(req.session);
			});
		}
	});
}

module.exports = { get: getLoginRoute, post: postLoginRoute };

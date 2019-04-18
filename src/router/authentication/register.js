//strict mode
'use strict';

//Adding SQLite DB
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('database/books.sqlite');

//Adding bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

//REGISTER ROUTE
//NEW route - shows the register form
function getRegisterRoute(req, res) {
	res.render('authentication/register', {
		username : req.session.username,
		pageId   : 'register',
		title    : 'YelpBook | Register',
		message  : req.flash('error')
	});
}

//CREATE route - creates the new user and redirects to all books page
function postRegisterRoute(req, res, next) {
	if (req.body.password !== req.body.confirmpassword) {
		req.flash('error', 'Both password fields must match');
		res.redirect('/register');
	} else {
		bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
			db.run(
				'INSERT INTO users(username, password, user_fname, user_lname, email) VALUES(?, ?, ?, ?, ?)',
				[ req.body.username, hash, req.body.user_fname, req.body.user_lname, req.body.email ],
				(err) => {
					if (err) next(err);
					else {
						req.session.username = req.body.username;
						req.flash('success', 'You have successfully logged in');
						res.redirect('/books');
					}
				}
			);
			console.log(req.session);
		});
	}
}

module.exports = { get: getRegisterRoute, post: postRegisterRoute };

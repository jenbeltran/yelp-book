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
		pageId : 'register',
		title  : 'YelpBook | Register'
	});
}

//CREATE route - creates the new user and redirects to all books page
function postRegisterRoute(req, res, next) {
	bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
		db.run(
			'INSERT INTO users(username, password, user_fname, user_lname, email) VALUES(?, ?, ?, ?, ?)',
			[ req.body.username, hash, req.body.user_fname, req.body.user_lname, req.body.email ],
			(err) => {
				if (err) next(err);
				else {
					console.log(hash);
					res.redirect('/books');
				}
			}
		);
	});
}

module.exports = { get: getRegisterRoute, post: postRegisterRoute };

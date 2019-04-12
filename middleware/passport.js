'use strict';

let express = require('express'),
	sqlite3 = require('sqlite3').verbose(),
	db = new sqlite3.Database('database/books.sqlite'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	cookieParser = require('cookie-parser'),
	flash = require('connect-flash');

const app = express();

//to encrypt password in database
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0//P4$$w0rD';

module.exports = function(passport) {
	passport.serializeUser(function(user, done) {
		console.log('passport.serializeUser');
		console.log(user);
		return done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		console.log('passport.deserializeUser');
		console.log(id);
		db.get('SELECT * FROM users WHERE id = ?', [ id ], function(err, row) {
			return done(err, row[0]);
		});
	});

	passport.use(
		'local-signup',
		new LocalStrategy(
			{
				// by default, local strategy uses username and password
				usernameField     : 'username',
				passwordField     : 'password',
				passReqToCallback : true // allows us to pass back the entire request to the callback
			},
			function(req, username, password, done) {
				console.log('local signup called');
				// find a user whose username is the same as the forms username
				// we are checking to see if the user trying to login already exists
				db.all('SELECT * FROM users WHERE username = ?', [ username ], function(err, rows) {
					console.log(rows);

					if (err) return done(err);
					if (rows.length) {
						return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
					} else {
						// if there is no user with that email
						// create the user
						var newUserSql = {
							username : username,
							password : bcrypt.hashSync(password, null, null)
						};

						console.log('insert new user');
						db.run(
							'INSERT INTO users(username, password, user_fname, user_lname, email) VALUES(?, ?, ?, ?, ?)',
							[
								newUserSql.username,
								newUserSql.password,
								req.body.user_fname,
								req.body.user_lname,
								req.body.email
							],
							function(err, rows) {
								newUserSql.id = rows.insertId;

								return done(null, newUserSql);
							}
						);
					}
				});
			}
		)
	);

	passport.use(
		'local-login',
		new LocalStrategy(
			{
				// by default, local strategy uses username and password, we will override with email
				usernameField     : 'username',
				passwordField     : 'password',
				passReqToCallback : true // allows us to pass back the entire request to the callback
			},
			function(req, username, password, done) {
				console.log('local login strategy called');
				// callback with email and password from our form

				db.all('SELECT * FROM users WHERE username = ?', [ username ], function(err, rows) {
					if (err) return done(err);
					if (!rows.length) {
						return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
					}

					// if the user is found but the password is wrong
					if (!bcrypt.compareSync(password, rows[0].password))
						return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

					// all is well, return successful user
					return done(null, rows[0]);
				});
			}
		)
	);
};

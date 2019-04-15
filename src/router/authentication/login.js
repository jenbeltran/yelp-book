//strict mode
'use strict';

//Adding SQLite DB
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('database/books.sqlite');

// LOGIN ROUTE
//NEW route - shows the login form

function loginRoute(req, res, err) {
	res.render('authentication/login', {
		pageId : 'login',
		title  : 'YelpBook | Login'
	});
}

module.exports = { get: loginRoute };

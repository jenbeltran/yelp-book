//strict mode
'use strict';

//Adding SQLite DB
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('database/books.sqlite');

//SEE ALL BOOKS
//INDEX route
function getAllBooksRoute(req, res, next) {
	db.all('SELECT * FROM books', (err, bookData) => {
		if (err) next(err);
		else {
			res.render('books/books', {
				username : req.session.username,
				bookData : bookData,
				pageId   : 'books',
				title    : 'YelpBook | All Books'
			});
		}
	});
}

module.exports = { get: getAllBooksRoute };

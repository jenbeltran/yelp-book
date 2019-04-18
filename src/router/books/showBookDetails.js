//strict mode
'use strict';

//Adding SQLite DB
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('database/books.sqlite');

//SEE BOOK DETAILS AND COMMENTS
//SHOW route
function showBookDetailsRoute(req, res, next) {
	if (!req.session.username) {
		res.render('errorPage');
	} else {
		db.all('SELECT * FROM books WHERE book_id =?', [ req.params.id ], (err, bookData) => {
			if (err) next(err);
			else {
				res.render('books/showBookDetails', {
					username : req.session.username,
					bookData : bookData,
					pageId   : 'showBookDetails',
					title    : 'YelpBook | Book Details'
				});
			}
		});
	}
}

module.exports = { get: showBookDetailsRoute };

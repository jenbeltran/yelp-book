//strict mode
'use strict';

//Adding SQLite DB
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('database/books.sqlite');

//DELETE A CURRENT BOOK
//DELETE route - deletes the book and redirects to all books page
function deleteBookRoute(req, res, next) {
	db.run('DELETE FROM books WHERE book_id =?', [ req.params.id ], (err) => {
		if (err) next(err);
		else {
			res.redirect('/books');
		}
	});
}

module.exports = { delete: deleteBookRoute };

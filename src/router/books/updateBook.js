//strict mode
'use strict';

let express = require('express');
let app = express();

//Adding SQLite DB
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('database/books.sqlite');

//UPDATE A CURRENT BOOK
//EDIT route - shows the edit book form
function showEditBookFormRoute(req, res, next) {
	db.all('SELECT * FROM books WHERE book_id =?', [ req.params.id ], (err, bookData) => {
		if (err) next(err);
		else {
			res.render('books/editBookForm', {
				username : req.session.username,
				bookData : bookData,
				pageId   : 'editBookForm',
				title    : 'YelpBook | Edit Book Details'
			});
		}
	});
}

//UPDATE route - updates the book and redirects to book details page
function updateBookDetailsRoute(req, res, next) {
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
}

module.exports = { get: showEditBookFormRoute, put: updateBookDetailsRoute };

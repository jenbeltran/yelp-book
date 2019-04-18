//strict mode
'use strict';

//Adding SQLite DB
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('database/books.sqlite');

//ADD A NEW BOOK
//NEW route - shows the new book form
function addNewBookRoute(req, res) {
	if (!req.session.username) {
		res.render('errorPage');
	} else {
		res.render('books/newBookForm', {
			username : req.session.username,
			pageId   : 'newBook',
			title    : 'YelpBook | Add a Book'
		});
	}
}

//CREATE route - creates the new book and redirects to all books page
function createNewBookRoute(req, res, next) {
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
}

module.exports = { get: addNewBookRoute, post: createNewBookRoute };

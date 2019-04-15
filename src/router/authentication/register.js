//strict mode
'use strict';

//Adding SQLite DB
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('database/books.sqlite');

//REGISTER ROUTE
//NEW route - shows the register form
function registerRoute(req, res, err) {
	res.render('authentication/register', {
		pageId : 'register',
		title  : 'YelpBook | Register'
	});
}

module.exports = { get: registerRoute };

//CREATE route - creates the new user and redirects to all books page
// router.post('/register', urlencodedParser, (req, res) => {
// 	bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
// 		db.run(
// 			'INSERT INTO users(username, password, user_fname, user_lname, email) VALUES(?, ?, ?, ?, ?)',
// 			[ req.body.username, hash, req.body.user_fname, req.body.user_lname, req.body.email ],
// 			(err) => {
// 				if (err) next(err);
// 				else {
// 					res.redirect('/books');
// 				}
// 			}
// 		);
// 	});
// });

//strict mode
'use strict';

//LANDING PAGE
//INDEX route
// Exporting as a function to router.js

function getLandingRoute(req, res) {
	res.render('books/landing', {
		username : req.session.username,
		pageId   : 'landing',
		title    : 'Welcome to YelpBook'
	});
}

module.exports = { get: getLandingRoute };

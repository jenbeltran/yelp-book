'use strict';

function logoutRoute(req, res, next) {
	req.session.destroy((error) => {
		if (error) {
			next(error);
		} else {
			res.redirect('/');
		}
	});
}

module.exports = { get: logoutRoute };

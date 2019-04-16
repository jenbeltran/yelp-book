'use strict';

/**
 * Applies default session values
 */
module.exports = function loginMiddleware(req, res, next) {
	// If the username is undefined, we can assume the session has not been set at all
	if (req.session.username === undefined) {
		req.session.username = null;
	}

	// Move onto next middleware (defined with app.use)
	next();
};

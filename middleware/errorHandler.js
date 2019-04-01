'use strict';

module.exports = function defaultErrorHandler(error, request, response, next) {
	console.error(error);

	if (response.headersSend) next(error);
	else {
		response.status(500).render('errorPage');
	}
};

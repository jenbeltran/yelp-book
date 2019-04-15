//strict mode
'use strict';

let express = require('express'),
	router = require('./router/router'),
	defaultErrorHandler = require('../middleware/errorHandler');

// Create an instance of an express application
const app = express();

// Parse all incoming <form> data into an object we can access in our routes with `req.body`
app.use(express.urlencoded({ extended: true }));

//Connects all routes
app.use(router);

//Allows HTML page rendering
app.set('view engine', 'ejs');

//Allows CSS
app.use(express.static('public'));

//Checks errors as middleware
app.use(defaultErrorHandler);

//Connects server
app.listen(3000, () => {
	console.log('server started');
});

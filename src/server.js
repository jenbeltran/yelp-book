//strict mode
'use strict';

require('dotenv').config(); // Run this first to ensure all environment variables are set
let express = require('express'),
	router = require('./router/router'),
	session = require('express-session'),
	defaultSessionValues = require('../middleware/default-session-values'),
	authentication = require('../middleware/authentication'),
	defaultErrorHandler = require('../middleware/errorHandler');

// Create an instance of an express application
const app = express();

//Allows HTML page rendering
app.set('view engine', 'ejs');

//Allows CSS
app.use(express.static('public'));

// Parse all incoming <form> data into an object we can access in our routes with `req.body`
app.use(express.urlencoded({ extended: true }));

//Express Session middleware
app.use(
	session({
		secret            : process.env.SESSION_SECRET, // Used to cryptographically "sign" the session ID
		resave            : false, // Forces the session to be saved back to the session store, just a sane default
		saveUninitialized : true, // All HTTP requests without a session have a session started for them
		cookie            : {
			httpOnly : true, // Makes cookie inaccessible to client side JS
			maxAge   : 12000000 // Cookie will expire after two hours
		}
	})
);

// Middleware to prepare default values for sessions
// This must come after the session middleware to ensure its values are set properly
app.use(defaultSessionValues);

//Connects all routes
app.use(router);

// isLoggedIn - authentication middleware
app.use(authentication);

//Checks errors as middleware
app.use(defaultErrorHandler);

/**
 * Start server
 */
app.listen(process.env.HTTP_PORT, () => {
	console.log(`Express server started on port ${process.env.HTTP_PORT}.`);
});

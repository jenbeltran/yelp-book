'use strict';
const express = require('express'),
	router = require('./router'),
	ejs = require('ejs'),
	defaultErrorHandler = require('../middleware/errorHandler');

const app = express();

app.use(router);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(defaultErrorHandler);

app.listen(3000, () => {
	console.log('server started');
});

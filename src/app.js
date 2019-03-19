'use strict';
const express = require('express'),
	bodyParser = require('body-parser'),
	router = require('./router'),
	ejs = require('ejs');

const app = express();

app.use(router);
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.listen(3000, () => {
	console.log('server started');
});

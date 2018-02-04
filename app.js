'use strict';
//Import npm modules
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('pino')(require('./config/pino'));
const config = require('./config/application');
global.appConfig = config;
global.logger = logger;
// Initialize Global cache
global.cache = {};
//set route controllers
const index = require('./routes/index');
const users = require('./routes/users');

//instantiate express app
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//disable x-powered-by to prevent hacks
app.disable('x-powered-by');

//setup middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//setup routes
app.use('/', index);
app.use('/login', index);
app.use('/users', users);

//error middlewares
app.use(require('./middlewares'));

module.exports = app;

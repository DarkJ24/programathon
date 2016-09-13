var config = require('../config/config'),
	models  = require('../app/models'),
	rendersController = require('../app/controllers/renders'),
	productsController = require('../app/controllers/products'),
	userController = require('../app/controllers/user');

var express = require('express');
var router = express.Router();
var passport = require('./passport');

	console.log('App is running on: '+config.route);

	router.get('/', userController.IsAuthenticated, rendersController.getHomePage);

	router.get('/product/:id', productsController.getProduct);

	router.get('/users', userController.getAllUsers);

	router.get('/login', rendersController.getLoginPage);
  
	router.post('/login', passport.authenticate('local', { failureRedirect: '/failedLogIn' }), userController.succesfullLogIn);

	router.get('/failedLogIn', userController.failedLogIn);

	router.post('/logout', userController.destroySession);

	router.post('/signup', userController.signUp);

module.exports = router;
var db = require('../models');

exports.signUp = function(req, res){
	db.User.findOne({where: {username: req.body.email}})
	.then(function (user){
		if(!user) {
			db.User.create({
				username: req.body.email, 
				email: req.body.email, 
				password: req.body.password,
				role: req.body.role
			}).then(function(user){
				req.username = req.body.email;
				res.set("Content-Type", "text/json");
    			res.status(200).send( JSON.stringify( user ) );
			}).error(function(err){
				res.set("Content-Type", "text/json");
    			res.status(400).send( JSON.stringify( err ) );
			});
		} else {
			res.set("Content-Type", "text/json");
    		res.status(400).send( JSON.stringify({ user: user, message: 'User already exists!' }) );
		}
	});
};

exports.IsAuthenticated = function(req, res, next){
    if(req.isAuthenticated()){
        next();
    } else {
        res.render('logIn');
    }
};

exports.destroySession = function(req, res, next) {
	req.username = null;
    req.logOut();
    req.session.destroy();
    res.redirect('/');
};

exports.getAllUsers = function(req, res, next) {
    models.User.findAll({}).then(function(users) {
		res.set("Content-Type", "text/json");
    	res.status(200).send( JSON.stringify( users ) );
	});
};

exports.failedLogIn = function(req, res, next) {
	res.set("Content-Type", "text/json");
    res.status(400).send( JSON.stringify({ message: "User and password didn't match!" }) );
};

exports.succesfullLogIn = function(req, res, next) {
	res.set("Content-Type", "text/json");
    res.status(200).send( JSON.stringify({ user: req.user }) );
};
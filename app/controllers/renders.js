var utils = require('../services/UtilesServices'),
    config = require('../../config/config');

exports.getHomePage = function(req, res){
    res.render('home', { });
};

exports.getLoginPage = function(req, res){
    res.render('login', { });
};

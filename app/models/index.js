"use strict";
var fs      = require('fs'),
	path      = require('path'),
	Sequelize = require('sequelize'),
	config	  = require('../../config/config'),
	sequelize = new Sequelize(config.databaseInfo.database, config.databaseInfo.username, config.databaseInfo.password, config.databaseInfo),
	db        = {};

fs.readdirSync(__dirname)
  .filter(function(file) {
	return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
	var model = sequelize.import(path.join(__dirname, file));
	db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
	db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
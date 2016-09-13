var bcrypt = require('bcrypt-nodejs')

module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('User', {
		id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
		username: {type: DataTypes.STRING, unique: true, allowNull: false, validate: {notEmpty: true}},
		email: {type: DataTypes.STRING, unique: true, allowNull: false, validate: {isEmail: true, notEmpty: true}},
		password: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
		role: {
		    type:   DataTypes.ENUM,
		    values: ['admin', 'customer'],
		    allowNull: false,
		    defaultValue: 'customer'
		}
	},
	{
		classMethods: {
			validPassword: function(password, passwd, done, user){
				bcrypt.compare(password, passwd, function(err, isMatch){
					if (err) {
						console.log(err);
					}
					if (isMatch) {
							return done(null, user);
					} else {
							return done(null, false);
					}
				});
			}
		}
	});

	var hashPassword = function(user, options, callback) {
		var salt = bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
            return salt;
        });
		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if (err) {
				return callback(err);
			}
			user.password = hash;
			return callback(null, options);
		});
	};

	User.beforeCreate(function (user, options, callback){
		user.email = user.email.toLowerCase();
		if (user.password) {
			hashPassword(user, options, callback);
		}
		else {
			return callback(null, options);
		}
	});

	User.beforeUpdate(function (user, options, callback){
		user.email = user.email.toLowerCase();
		if (user.password) {
			hashPassword(user, options, callback);
		}
		else {
			return callback(null, options);
		}
	});

		
	return User;
};
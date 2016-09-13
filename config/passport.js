var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    db = require('../app/models');

// Serialize Sessions
passport.serializeUser(function(user, done){
    done(null, user);
});

//Deserialize Sessions
passport.deserializeUser(function(user, done){
    db.User.findOne({where: {id: user.id}})
    .then(function(user){
        done(null, user);
    }).catch(function(err){
        done(err, null);
    });
});

// For Authentication Purposes
passport.use(new LocalStrategy({
        usernameField: 'email'
    }, function(username, password, done){
        db.User.findOne({where: {username: username}})
        .then(function(user){
            passwd = user ? user.password : '';
            return db.User.validPassword(password, passwd, done, user);
        });
    }
));

module.exports = passport;
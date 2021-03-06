
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var config = require('config');
var User = mongoose.model('User');

/**
 * Expose
 */

module.exports = new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done) {
    var options = {
      criteria: { username: username },
      select:'name username email hashed_password salt'
    };
    User.load(options, function (err, user) {
      console.log('user returned from user.load is :::'+ JSON.stringify(user))
      if (err) return done(err)
      if (!user) {
        console.log('local.js ---> User.load ---> !user');
        return done(null, false, { message: 'Unknown user' });
      }
      if (!user.authenticate(password)) {
         console.log('local.js ---> User.load ---> !user.authenticate(password)');
        return done(null, false, { message: 'Invalid password' });
      }
      return done(null, user);
    });
  }
);

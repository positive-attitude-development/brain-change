const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

passport.serializeUser((admin, done) => {
  done(null, admin.id);
});

passport.deserializeUser((id, done) => {
  pool.query('SELECT * FROM "admin" WHERE id = $1', [id]).then((result) => {
    // Handle Errors
    const admin = result && result.rows && result.rows[0];

    if (admin) {
      // admin found
      delete admin.password; // remove password so it doesn't get sent
      // done takes an error (null in this case) and an admin
      done(null, admin);
    } else {
      // admin not found
      // done takes an error (null in this case) and an admin (also null in this case)
      // this will result in the server returning a 401 status code
      done(null, null);
    }
  }).catch((error) => {
    console.log('Error with query during deserializing admin', error);
    // done takes an error (we have one) and an admin (null in this case)
    // this will result in the server returning a 500 status code
    done(error, null);
  });
});

// Does actual work of logging in
passport.use('local', new LocalStrategy((username, password, done) => {
    pool.query('SELECT * FROM "admin" WHERE username = $1', [username])
      .then((result) => {
        const admin = result && result.rows && result.rows[0];
        if (admin && encryptLib.comparePassword(password, admin.password)) {
          // All good! Passwords match!
          // done takes an error (null in this case) and an admin
          done(null, admin);
        } else {
          // Not good! Username and password do not match.
          // done takes an error (null in this case) and an admin(also null in this case)
          // this will result in the server returning a 401 status code
          done(null, null);
        }
      }).catch((error) => {
        console.log('Error with query for admin', error);
        // done takes an error (we have one) and an admin(null in this case)
        // this will result in the server returning a 500 status code
        done(error, null);
      });
  }));

module.exports = passport;

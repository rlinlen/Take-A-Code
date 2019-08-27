
const passport = require('passport');
///Local
const LocalStrategy = require('passport-local').Strategy;
///
module.exports = (User) => {
  //Serialize user from Mongo User Instance into cookie.
  //id for Mongo Object Id
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findByPk(id)
      .then( user => {
          if (user) {
            done(null, user.get());
        } else {
            done(user.errors, null);
        }
      });
  });

  ///Local
  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ where: {UPN: username} }).then(user=>{
        if (!user || (user.PASSWORDHASH != password)) {
          return done(null, false);
        } 
        return done(null, user);
      })
    }
  ));
}

//https://code.tutsplus.com/tutorials/using-passport-with-sequelize-and-mysql--cms-27537
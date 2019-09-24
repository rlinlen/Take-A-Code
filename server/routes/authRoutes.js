const passport = require('passport');

module.exports = (app) => {


      //AzureAD
      app.get('/session',(req,res) => {
        //console.log(req.cookies);
        res.send(req.session);
      });
      
      
      app.get('/secret',(req,res) => {
          res.send({
              a:"b"
          });
      });
      
      app.get('/api/me',(req,res) => {
                res.send(req.user);
            });
      


      //Local
      app.post('/api/login/local',function(req, res, next) {
          passport.authenticate('local', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) { return res.status(403).send('Invalid username/password'); }
  
            req.logIn(user, function(err) {
              if (err) { return next(err); }
              return res.send(user);;
            });
          })(req, res, next);
        });

      app.get('/api/logout/local', function(req, res){
        req.session.destroy(function(err) {
          req.logOut();
          res.redirect('/')})
      });
};
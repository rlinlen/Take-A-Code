module.exports = (app, Model) => {

  //list users
    app.get('/api/users',
      async (req, res, next) => { 
        try{
            const response = await Model.findAll();
            res.send(response);
        }
        catch (err){
            res.send(err);
        }
      }
    )

  //list single user
  app.get('/api/user/:upn',
    async (req, res, next) => { 
      try{
          const response = await Model.findOne({ where: {UPN: req.params.upn} });
          res.send(response);
      }
      catch (err){
          res.send(err);
      }
    }
  );

  //edit user
  /* app.patch('/api/user/:upn',
    async (req, res) => { 
        let user = await User.findOne({ upn: req.params.upn}).exec();
        Object.entries(req.body).map(p => {user[p[0]] = p[1]});
        //console.log(user);
        const result = await user.save();
        res.send(result);
  }); */

  //create local user
  app.post("/api/user/new",
    async (req, res, next) => {
      console.log(req.body);
      //const { upn, password, name, role } = req.body;
      //const userBody = {...req.body};
      let userBody = {
        UPN:req.body.upn,
        PASSWORDHASH:req.body.password,
        NAME:req.body.name,
        STATUS:1
      }
      try{
        //const user = await new User({ name: name, upn: upn, password: password, role: role}).save();
        const user = await Model.create(userBody);
        res.send(user);
      }
      catch (err){
        if (err.name === "ValidationError") {
          //req.flash("Sorry, that username is already taken.");
          res.redirect("/");
        } else next(err);
      }
  });
}
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
  app.patch('/api/user/:upn',
    async (req, res) => { 
        //let user = await Model.findOne({ where: {UPN: req.params.upn} });
        //Object.entries(req.body).map(p => {user[p[0]] = p[1]});
        console.log({...req.body});
        let userBody = {
          PASSWORD:req.body.password,
          NAME:req.body.name
        }
        await Model.update(userBody, {
          where: {
            UPN: req.params.upn
          }
        })
        //const result = await user.save();
        res.send({result:"ok"});
  });

  //create local user
  app.post("/api/user/new",
    async (req, res, next) => {
      //console.log(req.body);
      //const { upn, password, name, role } = req.body;
      //const userBody = {...req.body};
      let userBody = {
        UPN:req.body.upn,
        PASSWORD:req.body.password,
        NAME:req.body.name,
        STATUS:1
      }
      try{
        //const user = await new User({ name: name, upn: upn, password: password, role: role}).save();
        let user = await Model.findOne({
          where: {
            UPN: userBody.UPN
          }
        })
        if(user){
          //user already exits!
          res.status(503).send({
            message: 'This is an error!'
         });
          //throw new Error('BROKEN')
        } else {
          const newUser = await Model.create(userBody);
          res.send(newUser);
        }
      }
      catch (err){
        //res.sendStatus(400).json({message:'Category must be unique!'});
        if (err.name === "ValidationError") {
          //req.flash("Sorry, that username is already taken.");
          res.redirect("/");
        } else next(err);
      }
  });

  //delete user
  app.delete('/api/user/:upn',
    async (req, res) => { 
        try{
          await Model.destroy({ where: {UPN: req.params.upn} });
        }
        catch (err){
          res.send(err);
        }
    });
}
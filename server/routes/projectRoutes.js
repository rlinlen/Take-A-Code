module.exports = (app, Model) => {
    
    //list studies
    app.get('/api/projects',
        async (req, res, next) => { 
            try{
                const response = await Model.findAll();
                res.send(response);
            }
            catch (err){
                res.send(err);
            }
        }
    );

    app.get('/api/project/:id',
        async (req, res) => { 
            try{
                const response = await Model.findByPk(req.params.id);
                res.send(response);
            }
            catch (err){
                res.send(err);
            }
    });

    //create audit
    app.post("/api/project/new",
        async (req, res) => {
            //console.log(req.body);
            try{
                const project = await Model.create(req.body);
                
                res.send(project);
            }
            catch (err){
                res.send(err);
            }
    });

    app.patch('/api/project/:id',
        async (req, res) => { 
            try{
                console.log(req.body);
                const result = await Model.update(req.body, {
                    where: {
                        id: req.params.id
                    }
                })

                res.send(result);
            }
            catch (err){
                res.send(err);
            }
    });

    //delete audit
    app.delete('/api/project/:id',
        (req, res) => { 
            try{
                //console.log(req.params.projectId);
                const response = Model.destroy({
                    where: {
                        id: req.params.id
                    }
                })

                res.send(response);
            }
            catch (err){
                res.send(err);
            }
    });

}

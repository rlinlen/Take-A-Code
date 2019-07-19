module.exports = (app, Model) => {
    
    //list studies
    app.get('/api/projects',
        async (req, res, next) => { 
            const response = await Model.findAll();
            res.send(response);
        }
    );

    app.get('/api/project/:projectId',
        async (req, res) => { 
            const response = await Model.findByPk(req.params.projectId);
            res.send(response);
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

    //delete audit
    app.delete('/api/project/:projectId',
        async (req, res) => { 
            try{
                //console.log(req.params.projectId);
                const response = await Model.destroy({
                    where: {
                        id: req.params.projectId
                    }
                })

                res.send(response);
            }
            catch (err){
                res.send(err);
            }
    });

}

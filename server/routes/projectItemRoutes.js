module.exports = (app, Model, Project) => {
    
    //list studies
    app.get('/api/projectItems/:projectId',
        async (req, res, next) => { 
            try{
                const response = await Model.findAll({where: {
                    PROJECT_ID: req.params.projectId
                }});
                res.send(response);
            }
            catch (err){
                res.send(err);
            }
        }
    );

    //Currently same with project -> creating Form concept in the future @ 20190723
    app.get('/api/projectItem/:projectId',
        async (req, res, next) => { 
            try{
                const ProjectItems = await Model.findAll({where: {
                    PROJECT_ID: req.params.projectId
                }});
                //console.log(ProjectItems);
               

                const Dictionaries = ProjectItems.map(i => {return {
                    id:i.dataValues.id, 
                    DICTIONARY_ID: i.dataValues.DICTIONARY_ID,
                    SEQ: i.dataValues.SEQ
                }});
                //console.log(Dictionaries);

                const ProjectModel = await Project.findByPk(req.params.projectId);
                //console.log(ProjectModel);

                const response = {
                    PROJECT_ID: req.params.projectId,
                    PROJECT_NAME: ProjectModel.dataValues.NAME,
                    Dictionaries: Dictionaries
                }
                //console.log(response);

                res.send(response);
            }
            catch (err){
                res.send(err);
            }
        }
    );

    //create
    app.post("/api/projectItem/:projectId/new",
        async (req, res) => {
/*             { PROJECT_ID: 4,
                PROJECT_NAME: 't12312321',
                Dictionaries: [ { DICTIONARY_ID: '9', SEQ: '1' }, { DICTIONARY_ID: '7', SEQ: '2' } ] } */

            try{
                //console.log(req.body);
                let {Dictionaries, ...rest} = req.body

                let items = Dictionaries.map(i => {return {...i, PROJECT_ID: rest.PROJECT_ID}});
                await Model.bulkCreate(items);
                
                res.send({result:"ok"});
            }
            catch (err){
                console.log(err);
                res.send(err);
            }
    });

    app.patch('/api/projectItem/:projectId',
        async (req, res) => { 
            try{
                //Get DB items
                const Items = await Model.findAll({ where: { PROJECT_ID: req.params.projectId } });
                let dbItems = Items.map(i => {return i.dataValues})
                
                console.log(req.body);

                //Get Form items
                let {Dictionaries, ...rest} = req.body;
                

                //separete the newly added item
                let addedItems = [];
                Dictionaries.foreach(i => {if (!(i.hasOwnProperty('id'))) addedItems.push({...i, PROJECT_ID:req.params.projectId} ) });
                
                //update and delete based on DB id
                dbItems.forEach(i => {
                    //update
                    const result = Dictionaries.find( item => item.id == i.id );
                    if(result){
                        Model.update(result, {
                            where: {
                                id: i.id
                            }
                        })
                    }
                    //being removed
                    else{
                        Model.destroy({
                            where:  { id: i.id }
                        })
                    }
                });
                //create newly added item
                await Model.bulkCreate(addedItems);

                res.send({result:"ok"});
            }
            catch (err){
                res.send(err);
            }
    });

    /* //delete audit
    app.delete('/api/projectItem/:id',
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
    }); */

}

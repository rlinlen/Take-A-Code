const requireAuthenticated = require('../middlewares/requireAuthenticated');

module.exports = (app, Model) => {
    
    //list studies
    app.get('/api/projs',requireAuthenticated,
        async (req, res, next) => { 
            try{
                const response = await Model.Parent.findAll();
                console.log(response);
                res.send(response);
            }
            catch (err){
                res.send(err);
            }
        }
    );

    app.get('/api/proj/:id',requireAuthenticated,
        async (req, res) => { 
            try{
                const Project = await Model.Parent.findByPk(req.params.id);
                const ProjectItems = await Model.Child.findAll({ where: { PROJECT_ID: req.params.id } });

                let items = ProjectItems.map(i => {return i.dataValues})

                response = {...Project.dataValues, ProjectItem:items}

                res.send(response);
            }
            catch (err){
                res.send(err);
            }
    });

    //create audit
    app.post("/api/proj/new",requireAuthenticated,
        async (req, res) => {
            //console.log(req.body);
            try{
                let {ProjectItem, ...Project} = req.body;

                //Insert Parent to get PK
                const project = await Model.Parent.create(Project);

                //Insert parent id to each child item (FK)
                let items = ProjectItem.map(i => {return {...i, PROJECT_ID:project.id}});
                const projectItems = await Model.Child.bulkCreate(items);

                //const project = await Model.create(req.body);
                
                res.send({result:"ok"});
            }
            catch (err){
                res.send(err);
            }
    });

    app.patch('/api/proj/:id',requireAuthenticated,
        async (req, res) => { 
            try{
                //Get DB Child items
                const ProjectItems = await Model.Child.findAll({ where: { PROJECT_ID: req.params.id } });
                let dbItems = ProjectItems.map(i => {return i.dataValues})
                
                //console.log(req.body);
/*                 { Name: 'dn12',
                   Dict_Rule: 'dr12',
                   Dict_Current: null,
                   DictionaryItem:
                    [ { id: 3, Dict_Id: 12, Value: 'dv1', Display: 'dd1', DICT_ID: 12 },   <-- already exists
                      { Display: 'dd2', Value: 'dv2' } ] } */  // <-- new added

                //Get Form items
                let {ProjectItem, ...Project} = req.body;
                
                //Update Parent items
                 Model.Parent.update(Project, {
                    where: {
                        id: req.params.id
                    }
                })

                //separete child newly added item
                let addedItems = []
                ProjectItem.forEach(i => {if (!(i.hasOwnProperty('id'))) addedItems.push({...i, PROJECT_ID:req.params.id} ) });
                //let addedItems = DictionaryItem.map(i => {if (!(i.hasOwnProperty('id'))) return {...i, DICT_ID:req.params.id} });
                
                //update and delete based on DB id
                dbItems.forEach(i => {
                    //update
                    const result = ProjectItem.find( item => item.id == i.id );
                    if(result){
                        Model.Child.update(result, {
                            where: {
                                id: i.id
                            }
                        })
                    }
                    //being removed
                    else{
                        Model.Child.destroy({
                            where:  { id: i.id }
                        })
                    }
                });
                //create newly added item
                await Model.Child.bulkCreate(addedItems);

                res.send({result:"ok"});
            }
            catch (err){
                console.log(err);
                res.send(err);
            }
    });

    //delete
    app.delete('/api/proj/:id',requireAuthenticated,
        async (req, res) => { 
            try{
                //delete child first then parent
                //must return promise so that the item can be flushed using await outside
                const r = await Model.Child.destroy({
                    where:  { PROJECT_ID: req.params.id }
                })
                //console.log(r);   //r -> number of deleted rows

                const response = Model.Parent.destroy({
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

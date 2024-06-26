const requireAuthenticated = require('../middlewares/requireAuthenticated');

module.exports = (app, Model) => {
    
    //list studies
    app.get('/api/projItemDicts/:projectItemId',requireAuthenticated,
        async (req, res, next) => { 
            try{
                const response = await Model.Child.findAll({where: {
                    PROJECTITEM_ID: req.params.projectItemId
                }});
                res.send(response);
            }
            catch (err){
                res.send(err);
            }
        }
    );

    //Currently same with project -> creating Form concept in the future @ 20190723
    app.get('/api/projItemDict/:projectItemId',requireAuthenticated,
        async (req, res, next) => { 
            try{
                const ProjItemDicts = await Model.Child.findAll({where: {
                    PROJECTITEM_ID: req.params.projectItemId
                }});
                //console.log(ProjectItems);
               

                const Dictionaries = ProjItemDicts.map(i => {return {
                    id:i.dataValues.id, 
                    DICTIONARY_ID: i.dataValues.DICTIONARY_ID,
                    SEQ: i.dataValues.SEQ
                }});
                //console.log(Dictionaries);

                const ProjectItemModel = await Model.Parent.findByPk(req.params.projectItemId);
                //console.log(ProjectModel);

                const response = {
                    PROJECTITEM_ID: req.params.projectItemId,
                    PROJECTITEM_NAME: ProjectItemModel.dataValues.NAME,
                    PROJECTITEM_RULE: ProjectItemModel.dataValues.PROJECTITEM_RULE,
                    PROJECTITEM_SPLITDICT: ProjectItemModel.dataValues.PROJECTITEM_SPLITDICT,
                    Dictionaries: Dictionaries
                }
                //console.log(response);

                res.send(response);
            }
            catch (err){
                //console.log(err)
                res.send(err);
            }
        }
    );

    //create
    app.post("/api/projItemDict/:projectItemId/new",requireAuthenticated,
        async (req, res) => {
/*             { PROJECT_ID: 4,
                PROJECT_NAME: 't12312321',
                Dictionaries: [ { DICTIONARY_ID: '9', SEQ: '1' }, { DICTIONARY_ID: '7', SEQ: '2' } ] } */

            try{
                //console.log(req.body);
                let {Dictionaries, ...rest} = req.body

                let items = Dictionaries.map(i => {return {...i, PROJECTITEM_ID: rest.PROJECTITEM_ID}});
                await Model.Child.bulkCreate(items);
                
                res.send({result:"ok"});
            }
            catch (err){
                //console.log(err);
                res.send(err);
            }
    });

    app.patch('/api/projItemDict/:projectItemId',requireAuthenticated,
        async (req, res) => { 
            try{
                //Get DB items
                const Items = await Model.Child.findAll({ where: { PROJECTITEM_ID: req.params.projectItemId } });
                let dbItems = Items.map(i => {return i.dataValues})
                
                //console.log(req.body);

                //Get Form items
                let {Dictionaries, ...rest} = req.body;
                

                //separete the newly added item
                let addedItems = [];
                Dictionaries.forEach(i => {if (!(i.hasOwnProperty('id'))) addedItems.push({...i, PROJECTITEM_ID:req.params.projectItemId} ) });
                
                //update and delete based on DB id
                dbItems.forEach(i => {
                    //update
                    const result = Dictionaries.find( item => item.id == i.id );
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
                //console.log(err);
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

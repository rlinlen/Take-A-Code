module.exports = (app, Model) => {
    
    //list all items
    app.get('/api/takens',
        async (req, res, next) => { 
            try{
                const response = await Model.Child.findAll();
                res.send(response);
            }
            catch (err){
                res.send(err);
            }
        }
    );

    //list all items with Project
    app.get('/api/takens/project/:projectId',
        async (req, res, next) => { 
            try{
                let response = [];
                const ProjectItems = await Model.Parent.findAll({ where: { PROJECT_ID: req.params.projectId } });
                //console.log(ProjectItems)
                //let kv = Object.entries(ProjectItems.dataValues);
                //console.log(kv)
                for(i = 0; i < ProjectItems.length; i++){
                    //console.log(ProjectItems[i].dataValues.id)
                    const ProjectItemTakens = await Model.Child.findAll({ 
                        include: [{// Notice `include` takes an ARRAY
                            model: Model.Parent
                        }],
                        where: { PROJECTITEM_ID: ProjectItems[i].dataValues.id } 
                    });
                    //console.log(ProjectItemTakens)
                    response = [...response, ...ProjectItemTakens]
                }

                res.send(response);
            }
            catch (err){
                res.send(err);
            }
        }
    );

    //list all items with ProjectItem
    app.get('/api/takens/projectItem/:projectItemId',
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

    //create bulk takens given projectItemId
    app.post("/api/taken/new/:projectItemId",
        async (req, res) => {
            /* {[dictId]:{
                seq:seq,
                value:(+value + +numCurrent).toString().padStart(rule, "0"),
                inc: value,  //for posting db the increment
                type:type
                },
            code:}...} */
            try{
                let {code} = req.body
                let takenItem = {
                    PROJECTITEM_ID:req.params.projectItemId,
                    VALUE:code,
                    CREATEDTIME:new Date()
                }
                const taken = await Model.Child.create(takenItem);

                res.send({result:"ok"});
            }
            catch (err){
                console.log(err);
                res.send(err);
            }
    });

}

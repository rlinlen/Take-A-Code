const requireAuthenticated = require('../middlewares/requireAuthenticated');

module.exports = (app, Model) => {
    
    //list studies
    app.get('/api/dicts',requireAuthenticated,
        async (req, res, next) => { 
            try{
                const response = await Model.Parent.findAll();
                res.send(response);
            }
            catch (err){
                res.send(err);
            }
        }
    );

    app.get('/api/dict/:id',requireAuthenticated,
        async (req, res) => { 
            try{
                const Dictionary = await Model.Parent.findByPk(req.params.id);
                const DictionaryItems = await Model.Child.findAll({ where: { DICT_ID: req.params.id } });
                //console.log(Dictionary.dataValues);
                //console.log(DictionaryItem);

                //DictionaryItem:[{dataValues:{blabla}},]
                let items = DictionaryItems.map(i => {return i.dataValues})
                
                response = {...Dictionary.dataValues, DictionaryItem:items}

                res.send(response);
            }
            catch (err){
                res.send(err);
            }
    });

    //create
    app.post("/api/dict/new",requireAuthenticated,
        async (req, res) => {
            //console.log(req.body);
            try{
                //const project = await Model.Parent.create(req.body);

                let {DictionaryItem, ...Dictionary} = req.body;
                //DictionaryItem: [ { Display: 'ddd', Value: '234' } ]
                //console.log('Dictionary');
                //console.log(Dictionary);

                //Insert Parent to get PK
                const dictionary = await Model.Parent.create(Dictionary);
                //console.log(dictionary);
                //console.log(dictionary.id);


                //Insert parent id to each child item (FK)
                let items = DictionaryItem.map(i => {return {...i, DICT_ID:dictionary.id}});
                const dictionaryItem = await Model.Child.bulkCreate(items);

                res.send({result:"ok"});

                
            }
            catch (err){
                res.send(err);
            }
    });

    app.patch('/api/dict/current/:id',requireAuthenticated,
        async (req, res) => { 
            try{
               
                //Get Form items
                let {value} = req.body;

                //make sure it's always update from db to avoid lock
                const Dictionary = await Model.Parent.findByPk(req.params.id);

                //initilize
                Dictionary.DICT_CURRENT = Dictionary.DICT_CURRENT || 0
                let newCurrent = +Dictionary.DICT_CURRENT + +value;

                //Update Parent items
                 Model.Parent.update({DICT_CURRENT: newCurrent}, {
                    where: {
                        id: req.params.id
                    }
                })

                //console.log(Dictionary);
                //console.log(value);

                res.send({result:"ok", originalCurrent: Dictionary.DICT_CURRENT, rule: Dictionary.DICT_RULE});
            }
            catch (err){
                res.send(err);
            }
    });


    app.patch('/api/dict/:id',requireAuthenticated,
        async (req, res) => { 
            try{
                //Get DB Child items
                const DictionaryItems = await Model.Child.findAll({ where: { DICT_ID: req.params.id } });
                let dbItems = DictionaryItems.map(i => {return i.dataValues})
                
                //console.log(req.body);
/*                 { Name: 'dn12',
                   Dict_Rule: 'dr12',
                   Dict_Current: null,
                   DictionaryItem:
                    [ { id: 3, Dict_Id: 12, Value: 'dv1', Display: 'dd1', DICT_ID: 12 },   <-- already exists
                      { Display: 'dd2', Value: 'dv2' } ] } */  // <-- new added

                //Get Form items
                let {DictionaryItem, ...Dictionary} = req.body;
                
                //Update Parent items
                 Model.Parent.update(Dictionary, {
                    where: {
                        id: req.params.id
                    }
                })

                //separete child newly added item
                let addedItems = []
                DictionaryItem.forEach(i => {if (!(i.hasOwnProperty('id'))) addedItems.push({...i, DICT_ID:req.params.id} ) });
                //let addedItems = DictionaryItem.map(i => {if (!(i.hasOwnProperty('id'))) return {...i, DICT_ID:req.params.id} });
                
                //update and delete based on DB id
                dbItems.forEach(i => {
                    //update
                    const result = DictionaryItem.find( item => item.id == i.id );
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
                res.send(err);
            }
    });

    //delete
    app.delete('/api/dict/:id',requireAuthenticated,
        async (req, res) => { 
            try{
                //delete child first then parent
                //must return promise so that the item can be flushed using await outside
                const r = await Model.Child.destroy({
                    where:  { DICT_ID: req.params.id }
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

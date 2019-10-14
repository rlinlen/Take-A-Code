const requireAuthenticated = require('../middlewares/requireAuthenticated');

module.exports = (app, Model) => {
    
    //list
    app.get('/api/dict/splits/:dictId',requireAuthenticated,
        async (req, res, next) => { 
            try{
                const DictSplit = await Model.findAll({ where: { DICT_ID: req.params.dictId } });
                response = DictSplit.dataValues

                res.send(response.dataValues);
            }
            catch (err){
                res.send(err);
            }
        }
    );

    app.get('/api/dict/split/:id',requireAuthenticated,
        async (req, res) => { 
            try{
                const DictSplit = await Model.Parent.findByPk(req.params.id);
                response = DictSplit.dataValues

                res.send(response);
            }
            catch (err){
                res.send(err);
            }
    });


    app.patch('/api/dict/split/current/:dictId/:splitValue',requireAuthenticated,
        async (req, res) => { 
            try{
                //Get Form items
                let {value} = req.body;

                //make sure it's always update from db to avoid lock
                //const DictSplit = await Model.findByPk(req.params.id);
                const DictSplit = await Model.findOrCreate({where: {DICT_ID: req.params.id, DICT_SPLITVALUE: req.params.splitValue}})
                
                //initilize
                console.log(DictSplit.dataValues)
                DictSplit.dataValues.DICT_CURRENT = DictSplit.dataValues.DICT_CURRENT || 0
                let newCurrent = +DictSplit.DICT_CURRENT + +value;

                //Update Parent items
                Model.update({DICT_CURRENT: newCurrent}, {
                    where: {DICT_ID: req.params.id, DICT_SPLITVALUE: req.params.splitValue}
                })

                //console.log(Dictionary);
                //console.log(value);

                res.send({result:"ok", originalCurrent: DictSplit.dataValues.DICT_CURRENT});
            }
            catch (err){
                res.send(err.message);
            }
    });

}

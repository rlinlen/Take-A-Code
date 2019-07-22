module.exports = (app, Model) => {
    
    //list studies
    app.get('/api/dicts',
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

    app.get('/api/dict/:id',
        async (req, res) => { 
            try{
                const response = await Model.Parent.findByPk(req.params.id);
                res.send(response);
            }
            catch (err){
                res.send(err);
            }
    });

    //create audit
    app.post("/api/dict/new",
        async (req, res) => {
            console.log(req.body);
            try{
                //const project = await Model.Parent.create(req.body);

                let {DictionaryItem, ...Dictionary} = req.body;
                console.log('Dictionary');
                console.log(Dictionary);

                const dictionary = await Model.Parent.create(Dictionary);
                //console.log(dictionary);
                console.log(dictionary.id);
                res.send(dictionary);

                
                //Create Child//


                

                /* Model.Parent.create(Dictionary).then(function(item){
                    console.log(item);
                    res.json( item );
                }) */
                /* Model.Parent.create(Dictionary).then(function(item){
                    res.json({
                      "Message" : "Created item.",
                      "Item" : item
                    });
                  }).catch(function (err) {
                    console.log(err);
                  }); */
                
                
                //const dictionaryItem = await Model.Child.create(DictionaryItem);
                
            }
            catch (err){
                res.send(err);
            }
    });

    app.patch('/api/dict/:id',
        async (req, res) => { 
            try{
                console.log(req.body);
                const result = await Model.Parent.update(req.body, {
                    where: {
                        id: req.params.projectId
                    }
                })

                res.send(result);
            }
            catch (err){
                res.send(err);
            }
    });

    //delete audit
    app.delete('/api/dict/:id',
        async (req, res) => { 
            try{
                //console.log(req.params.projectId);
                const response = await Model.Parent.destroy({
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

module.exports = (app, model) => {
    
    //list studies
    app.get('/api/projects',
                (req, res, next) => { 
                    model.findAll().then( (result) => {
                        console.log(result);
                        res.send(result); 
                    } 
                    );
                }
            );

}

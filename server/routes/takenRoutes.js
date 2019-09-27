const axios = require('axios');
const conf = require('../config/conf')
const https = require('https')

const requireAuthenticated = require('../middlewares/requireAuthenticated');
const requireReadAuthorized = require('../middlewares/requireReadAuthorized');
const requireEditAuthorized = require('../middlewares/requireEditAuthorized');


const axiosAPI = axios.create({
    baseURL: conf().backendServer,
    headers: { "Content-Type": "application/json"},
    httpsAgent: new https.Agent({  
        rejectUnauthorized: false
      })
});
const {Dict} = require('../services/sequelize');

module.exports = (app, Model) => {
    
    //list all items
    app.get('/api/takens',requireAuthenticated,
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
    app.get('/api/takens/project/:projectId',requireAuthenticated,requireReadAuthorized,
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
    app.get('/api/takens/projectItem/:projectItemId',requireAuthenticated,
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
    app.post("/api/taken/new/:projectItemId",requireAuthenticated,
        async (req, res) => {
            //console.log(req.user)
            /* {[dictId]:{
                seq:seq,
                value:(+value + +numCurrent).toString().padStart(rule, "0"),
                inc: value,  //for posting db the increment
                type:type
                },
            code:}...} */
            try{
                //oringal one code at a time
                /* let codePromise = await Promise.all(Object.entries(req.body)
                    .filter(i => Number.isInteger(+i[0]))
                    .sort((a, b) => a[1].seq - b[1].seq)
                    .map(async kv => {
                        if(kv[1]['type']==='number'){
                            //get dictionary current directly from DB to avoid cache
                            let res = await axiosAPI.get(`/api/dict/${kv[0]}`)
                            //console.log('123')
                            //console.log(dict)
                            let numCurrent = res.data.DICT_CURRENT
                            let rule = res.data.DICT_RULE

                            //patach dict current
                            await axiosAPI.patch(`/api/dict/current/${kv[0]}`,{value:kv[1].inc});

                            return (+kv[1]['inc'] + +numCurrent).toString().padStart(rule , "0")
                        }else{
                            return kv[1].value
                        }
                    }))

                code = codePromise.join('-') */

                //multiple code for dict type-number
                let projectItem = {...req.body.items}

                let codePromise = await Promise.all(Object.entries(projectItem)
                    .filter(i => Number.isInteger(+i[0]))
                    .sort((a, b) => a[1].seq - b[1].seq)
                    .map(async kv => {
                        if(kv[1]['type']==='number'){
                            //patach dict current and get up-to-date current
                            //kv[1] = { seq: 4, value: '003', inc: '2', type: 'number' }
                            
                            //let dictPatch = await axiosAPI.patch(`/api/dict/current/${kv[0]}`,{value:kv[1].inc});
                            //// replace direct http call for no req.user
                            //make sure it's always update from db to avoid lock
                            let Model = Dict;
                            const Dictionary = await Model.Parent.findByPk(kv[0]);
                            
                            //initilize
                            Dictionary.DICT_CURRENT = Dictionary.DICT_CURRENT || 0
                            let newCurrent = +Dictionary.DICT_CURRENT + +kv[1].inc;
            
                            //Update Parent items
                             Model.Parent.update({DICT_CURRENT: newCurrent}, {
                                where: {
                                    id: kv[0]
                                }
                            })
                            let originalCurrent = Dictionary.DICT_CURRENT;
                            let rule = Dictionary.DICT_RULE;
                            ////

                            //let {originalCurrent, rule} = dictPatch.data;

                            let r = [];
                            for(let i = 1; i <= kv[1].inc; i++){
                                r.push((i + +originalCurrent).toString().padStart(rule , "0"))
                            }
                            return r
                            //return (+kv[1]['inc'] + +numCurrent).toString().padStart(rule , "0")
                        }else{
                            return kv[1].value
                        }
                    }))
                
                //codePromise: [001,abc,[001,002,003],fdf,[002,005]]
                let flatArray = [];
                
                let arrayIndex = codePromise.reduce((a,c,i) => Array.isArray(c) ? [...a,i] : a ,[]); //[2,4]
                //console.log(codePromise)
                let numberOnlyArray = codePromise.filter(i=>Array.isArray(i)); //[[001,002,003],[002,005]]
                //console.log(numberOnlyArray)
                let numberCountArray = numberOnlyArray.map(i=>i.length);
                let totalArrayCount = numberCountArray.reduce((a,c) => a*c,1);
                for(let i = 0; i < totalArrayCount; i++){
                    flatArray.push([...codePromise])
                }
                //flatArray:[[001,abc,[001,002,003],fdf,[002,005]] * totalArrayCount]

                


                let k = 0;
                for(let i = 0; i < numberOnlyArray.length; i++){
                    for(let j = 0; j < numberOnlyArray[i].length; j++){
                        //console.log(numberOnlyArray[i][j])
                        flatArray[k][arrayIndex[i]] = numberOnlyArray[i][j]
                        //arrayIndex.forEach(m=>flatArray[k][m] = numberOnlyArray[i][j])
                        //console.log(flatArray[k])
                        k++;
                    }
                }
                //console.log(flatArray);
                //codePromise.reduce((a,c)=>{},[])
                let codes = [];
                for(let i = 0; i< flatArray.length; i++){
                    code = flatArray[i].join(projectItem.join)
                    codes = [...codes, code]

                    let takenItem = {
                        PROJECTITEM_ID:req.params.projectItemId,
                        VALUE:code,
                        CREATEDTIME:new Date(),
                        UPN:req.user.UPN,
                        COMMENT:req.body.comment
                    }
                    await Model.Child.create(takenItem);
                }
               

                res.send({result:"ok", codes:codes});
            }
            catch (err){
                console.log(err);
                res.send(err);
            }
    });

}

var Sequelize = require('sequelize');
const keys = require('../config/keys');

//// create database
const sequelize = new Sequelize(
    keys.dbInstance,
    keys.dbAccount,
    keys.dbPassword, 
    {
        "dialect": keys.dbType,
        "host": keys.dbHost,
    }
);

/* const Project = require("./models/Project")(sequelize, Sequelize);
Project.findAll().then( (result) => {
    console.log(result);}); */
    
/* sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  }); */



////Initialize Model
const Project = require("../models/Project")(sequelize, Sequelize);

const Dictionary = require("../models/Dictionary")(sequelize, Sequelize);
const DictionaryItem = require("../models/DictionaryItem")(sequelize, Sequelize, Dictionary);
const Dict = {Parent: Dictionary, Child: DictionaryItem};

////Export
module.exports = {
    sequelize,
    Project,
    Dict
}


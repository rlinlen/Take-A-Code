var Sequelize = require('sequelize');
const keys = require('../config/keys');

//// create database
const sequelize = new Sequelize(
    keys().dbInstance,
    keys().dbAccount,
    keys().dbPassword, 
    {
        "dialect": keys().dbType,
        "host": keys().dbHost,
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
const ProjectItem = require("../models/ProjectItem")(sequelize, Sequelize);
const Proj =  {Parent: Project, Child: ProjectItem};

const Dictionary = require("../models/Dictionary")(sequelize, Sequelize);
const DictionaryItem = require("../models/DictionaryItem")(sequelize, Sequelize, Dictionary);
const Dict = {Parent: Dictionary, Child: DictionaryItem};

const ProjectItemDict = require("../models/ProjItemDict")(sequelize, Sequelize);
const ProjItemDict = {Parent: ProjectItem, Child: ProjectItemDict};

const Taken = require("../models/Taken")(sequelize, Sequelize, ProjectItem);
const ProjectItemTaken = {Parent: ProjectItem, Child: Taken};

const User = require("../models/User")(sequelize, Sequelize);

const DictSplit = require("../models/DictionarySplit")(sequelize, Sequelize, Dictionary);

////Export
module.exports = {
    sequelize,
    Proj,
    Dict,
    ProjItemDict,
    ProjectItemTaken,
    User,
    DictSplit
}


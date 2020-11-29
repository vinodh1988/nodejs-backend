const Sequelize = require('sequelize');
var sequelize=require('../connection');

var Resource=sequelize.define('resource',{
    employee_id:{
      type: Sequelize.INTEGER,
      primaryKey:true
    },
    name:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    status:{
      type: Sequelize.TEXT,
      allowNull:true
    },
    manager:{
      type: Sequelize.TEXT,
      allowNull:true
    },
    wfm_manager:{
      type: Sequelize.TEXT,
      allowNull:true
    },
    email:{
      type: Sequelize.TEXT,
      allowNull:true
    },
    lockstatus:{
      type: Sequelize.TEXT,
      allowNull:true
    },
    experience:{
      type: Sequelize.INTEGER,
      allowNull:true
    },
    profile_id:{
      type: Sequelize.INTEGER,
      allowNull:true
    }
  });

  var Skill=sequelize.define('skill',{
    skillid:{
      type: Sequelize.INTEGER,
      primaryKey:true
    },
    name:{
      type: Sequelize.TEXT,
      allowNull:false
    }
  },
  );

Resource.belongsToMany(Skill,{through : "skillmap",foreignKey : "employee_id"});
Skill.belongsToMany(Resource,{through : "skillmap", foreignKey : "skillid"});


Resource.sync({force: false}).then(() => {
    
    console.log("Resources table Synched!!!");
  });

Skill.sync({force: false}).then(() => {
    
    console.log("Skill table Synched!!!");
  });


  module.exports =  {Resource : Resource, Skill : Skill}
const model=require('../orm/model')
const resources =require('../orm/wfm-models/resource')
const route=require("express").Router();



route.get("/departments",function(request,response){
    model.department.findAll(
        {include:[model.employee]}
      ).then(function(data){
          response.json(data);
      }).catch(function(err){
          response.render([]);
      })
})



route.post("/departments",function(request,response){
var dept={department_id:request.body.department_id,
          name:request.body.name,
          employees:request.body.employees}
          console.log(dept);
    model.department.create(dept,{include: [model.employee]}).then(
        ()=>response.send("successfully uploaded")
    ).catch(
        ()=>response.sendStatus(500)
    );
})

route.get("/resources",function(request,response){
      resources.Resource.findAll({order:[["employee_id"]],include:resources.Skill}).then(
          
          (data)=>response.json(data),
          (e)=>response.status(500)
      )
});


route.get("/skills",function(request,response){
      resources.Skill.findAll().then(
          (data)=>response.json(data),
          (e)=>response.status(500)
      )
})

module.exports=route;
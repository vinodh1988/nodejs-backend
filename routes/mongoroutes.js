const route=require("express").Router();
const cities=require("../mongodb/schemas/city");
const passport=require("passport");


route.get("/all",passport.authenticate('jwt',{session:false}),function(request,response){

     cities.find({},{_id:0},function(err,data){
         if(err)
           response.send(500);
         else
           response.json(data);
     })

});

route.get("/all/:pattern",function(request,response){
    let pattern=request.params.pattern;
    cities.find({name:{$regex: pattern, $options:'i'}},{_id:0,name:1},function(err,data){
        if(err)
           response.sendStatus(500);
        else
           response.json(data);
     });
})


route.get("/allcities/:pattern",function(request,response){
    let pattern=request.params.pattern;
    cities.find({countrycode:pattern},{_id:0},function(err,data){
        if(err)
           response.sendStatus(500);
        else
           response.json(data);
     });
 })

 
route.post("/add",function(request,response){

    cities.insertMany(request.body,function(err,data){
        if(err)
           response.status(500);
        else
           response.send("Successfully added");
    })
});

module.exports=route;
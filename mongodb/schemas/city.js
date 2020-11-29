  
var mongoose=require('mongoose');

var cities=mongoose.model('citymodel',new mongoose.Schema(
    {
      id: String,
      name: String,
      countrycode: String,
      district: String,
      population: Number
    }
),'cities');

module.exports=cities;
const mongoose = require ('mongoose');
const configs = require ('./configs.json');//services/mongoose/configs.json
require  ('./models/user-model');
const Model= mongoose.model('Users');
const Spa= mongoose.model('Spa');
exports.dbConnection = function(){
    
const url=`mongodb://${configs.db.host}:${configs.db.port}/${configs.db.name}`;
mongoose.connect(url, (err, client)=>{
         
    if(err){
        return console.log(err);
    }
    
    console.log(`mongodb is On - ${url}`);

    });
}
exports.getSpaData = function(){
    console.log("getSpaData is ON ");;
//return  "accounting airport amusement_park aquarium art_gallery atm bakery bank bar beauty_salon bicycle_store book_store bowling_alley bus_station cafe campground car_dealer car_rental car_repair car_wash casino cemetery church city_hall clothing_store convenience_store courthouse dentist department_store doctor electrician electronics_store embassy fire_station florist funeral_home furniture_store gas_station gym hair_care hardware_store hindu_temple home_goods_store hospital insurance_agency jewelry_store laundry lawyer library liquor_store local_government_office locksmith lodging meal_delivery meal_takeaway mosque movie_rental movie_theater moving_company museum night_club painter park parking pet_store pharmacy physiotherapist plumber police post_office real_estate_agency restaurant roofing_contractor rv_park school shoe_store shopping_mall spa stadium storage store subway_station supermarket synagogue taxi_stand train_station transit_station travel_agency veterinary_care zoo";
//   return  Spa.insertOne({ 'places' : array }) //  
return Spa.find({})
}
exports.addNewUser = function (data){  
const  newUser= new Model({
name:data.name,
password: data.password,
marks:data.userLocation,
logIn:true
   });
   return newUser.save();
}


exports.isSignIn = function (data){
     
     return Model.findOne(
      { "password" : data.password, "name":data.name },function(err, result){
    if (err) {
        console.log('error: ' + err);
  
    } else {
        console.log('' + result + ' He is signin');
        return result
    }                                                                 }
   );
}

exports.isCookiesCorrect = function (data){
     return Model.findOneAndUpdate(
      { "name" : data.name, "password":data.password },
      { $set: { "LogIn:" : !data.logIn } }, function(err, result){
    if (err) {
        console.log('Error updating object: ' + err);
      
    } else {
       Model.findOne(
      { "name" : data.name, "password":data.password },function(err, result){
    if (err) {
        console.log('error: ' + err);
  
    } else {
        console.log('' + result + ' return new data');
        return result
    }                                                                 }
   );
    }
                                                                 }
   );
}


exports.loginLogoutAPI = function (data){
     return Model.findOneAndUpdate(
      { "name" : data.name, "password":data.password },
      { $set: { "LogIn:" : !data.logIn } }, function(err, result){
    if (err) {
        console.log('Error updating object: ' + err);
      
    } else {
       Model.findOne(
      { "name" : data.name, "password":data.password },function(err, result){
    if (err) {
        console.log('error: ' + err);
  
    } else {
        console.log('' + result + ' return new data');
        return result
    }                                                                 }
   );
    }
                                                                 }
   );
     /* Model.updateOne(
      { "name" : data.name, "password":data.password },
      { $set: { "LogIn:" : !data.logIn } }, function(err, result){
    if (err) {
        console.log('Error updating object: ' + err);
      
    } else {
        console.log('' + result + ' document(s) updated');
    return result;
    }
                                                                 }
   );*/
}
exports.updateMarks = function (data){
     return Model.updateOne(
      { "id" : data.id },
      { $set: { "marks:" : data.marks } }, function(err, result){
    if (err) {
        console.log('Error updating object: ' + err);
  
    } else {
        console.log('' + result + ' document(s) updated');
    }                                                                 }
   );
}
/*
export function deleteItem(id){
   return   Model.findById(id).remove();
}
*/
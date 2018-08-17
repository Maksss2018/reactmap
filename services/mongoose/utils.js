const mongoose = require ('mongoose');
const configs = require ('./configs.json');//services/mongoose/configs.json
require  ('./models/user-model');
const UIDGenerator = require('uid-generator');
const uidgen = new UIDGenerator(); 
const Model= mongoose.model('Users');
exports.dbConnection = function(){
    
const url=`mongodb://${configs.db.host}:${configs.db.port}/${configs.db.name}`;
mongoose.connect(url, (err, client)=>{
         
    if(err){
        return console.log(err);
    }
    
    console.log(`mongodb is On - ${url}`);

    });
}

exports.CheckingData = function (data){
     
     return Model.findOne({user:data.token},
     {arrayOfmarks: { 
         $elemMatch: { 
             adress: data.check
             } 
     }
     } 
   ,function(err, result){
    if (err) {
        console.log('error: ' + err);
  
    } else {
        console.log('' + result + 'Checked location ');
        return result
    }
       
   });
}



exports.addNewUser = function (data=null){  
const  newUser= new Model({
user:uidgen.generateSync(),
arrayOfmarks: data!==null?data.selectedPLaceses:[]
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
exports.dbChanges= function (data){

     return Model.findOne(
      { "user" : data.token },function(err, result){
    if (err) {
        console.log('error: ' + err);
  
    } else {
        
        console.log('' + result + ' He is signin');
        
        return result
    }                                                                 }
   );
}
exports.updateUserData = function (data){
     return Model.findOneAndUpdate(
      { "user" : data.user },
      { $push: { arrayOfmarks :data.selectedPLaceses } }, function(err, result){
    if (err) {
        console.log('Error updating object: ' + err);
      
    } else {
   console.log('' + result + ' return new data');
        return result
    }                                                             }
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
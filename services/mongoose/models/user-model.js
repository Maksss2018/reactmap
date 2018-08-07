const mongoose = require("mongoose") ;
 const Schema = mongoose.Schema;
 const testSchema = new Schema ({
            id:mongoose.Schema.Types.ObjectId,
            name:{type: String, require},
            password:{type: String, require},
            marks:[Schema.Types.Mixed],
            logIn:{type:Boolean}
                              });
 const spaDataSchema = new Schema ({
            places:[String]
                              });
 
const Spa = mongoose.model('Spa', spaDataSchema); 
const Users = mongoose.model('Users', testSchema);
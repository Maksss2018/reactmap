const mongoose = require("mongoose") ;
 const Schema = mongoose.Schema;
 const testSchema = new Schema ({
            id:mongoose.Schema.Types.ObjectId,
            user:{type: String, require},
            arrayOfmarks: [Schema.Types.Mixed]
                              });
const Users = mongoose.model('Users', testSchema);
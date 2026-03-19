const mongoose = require("mongoose");
const Schema= mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose").default;
const userSchema=new Schema({
    email:{
        type:String,
        required:true
    },
})
userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",userSchema);

//Some versions of passport-local-mongoose export like this:

// {
//   default: function plugin() {}
// }

// So when you do:

// require("passport-local-mongoose")

// it returns an object, not the plugin function → which causes the Mongoose error:

// First param to schema.plugin() must be a function, got "object"

// Using .default extracts the actual function.
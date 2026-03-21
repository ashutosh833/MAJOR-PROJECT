// const { string, date } = require("joi");
const mongoose = require("mongoose");
const Schema= mongoose.Schema;

const reviewSchema=new Schema({
    commenter:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    comment:String,
    rating:{
        type:Number,
        default:1,
        min:1,
        max:5
    },
    // createdAt:{
    //     type:Date,
    //     default:Date.now()
    // }
},{ timestamps: true })
// 👉 This automatically creates:

// createdAt
// updatedAt

module.exports=mongoose.model("Review",reviewSchema);
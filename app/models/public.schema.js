const { Schema , mongoose} = require("mongoose")

const commentSchema = Schema({
    type:{type: mongoose.Types.ObjectId , ref:"user" , required: true},
    comment: {type: String , required:true},
    createAt: {type:Date , default:()=> Date.now()},
    parent:{type:mongoose.Types.ObjectId , ref:"comment"}
})



module.exports = {
    commentSchema
}
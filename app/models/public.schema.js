const { default: mongoose } = require("mongoose")

const replySchema = new mongoose.Schema({
    comment: {type: String , required:true},
    user : {type:mongoose.Types.ObjectId , ref:"user"},
    show : {type: Boolean , required: true , default: false},
    openToComment : {type: Boolean , default: false}, 

}, {timestamps:{createdAt:true}})


const commentSchema = new mongoose.Schema({
    comment: {type: String , required:true},
    parent:{type:mongoose.Types.ObjectId},
    user : {type:mongoose.Types.ObjectId , ref:"user"},
    openToComment : {type: Boolean , default: true}, 
    show : {type: Boolean , required: true , default: false},
    replies: {type: [replySchema] , default:[]}

}, {timestamps:{createdAt:true}})






module.exports = {
    commentSchema
}
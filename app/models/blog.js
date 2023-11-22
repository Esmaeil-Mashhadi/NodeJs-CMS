const { default: mongoose } = require("mongoose");
const { commentSchema } = require("./public.schema");



const blogSchema = new mongoose.Schema({
author :{type: mongoose.Types.ObjectId , ref:"user", required : true},
title :{type: String, require : true},
short_text:{type:String , required : true},
text:{type:String , required : true},
image:{type:String , required:true},
tags:{type:[String] , default :[]},
category : {type :mongoose.Types.ObjectId , ref:"category", required:true},
comments:{type:[commentSchema], default :[]},
likes:{type:[mongoose.Types.ObjectId], ref:"user", default :[]},
dislikes:{type:[mongoose.Types.ObjectId], ref:"user", default :[]},
bookmarks:{type:[mongoose.Types.ObjectId] , ref:"user", default:[]}
},{timestamps : true , versionKey: false , toJSON :{virtuals : true}})


blogSchema.virtual("imageURL").get(function(){
    return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.image}`
})


module.exports = {
    BlogModel : mongoose.model("blog" , blogSchema)
}
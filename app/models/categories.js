const { Schema, model, default: mongoose } = require("mongoose");

const schema = Schema({
title: {type:String , required: true},
parent:{type:mongoose.Types.ObjectId, default : undefined}  
}, {
    id: false,
    toJSON :{
        virtuals: true
    }
})

schema.virtual('children' , {
    ref:"category",
    localField:"_id",
    foreignField:"parent"
})

function autoPopulate(next){
    this.populate({path: "children"  , select:{__v :0 , id:0}});
    next()
}

schema.pre('findOne' , autoPopulate).pre("find" , autoPopulate)


module.exports = {
    categoryModel: model("category" , schema)
}

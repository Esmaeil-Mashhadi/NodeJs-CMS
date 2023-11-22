const { default: mongoose, model } = require("mongoose");
const { commentSchema } = require("./public.schema");


const productSchema = new mongoose.Schema({
    title : {type: String, required : true},
    short_text : {type: String, required : true},
    text : {type: String, required : true},
    images : {type: [String], default :[] },
    tags : {type: [String], default : []},
    category : {type: mongoose.Types.ObjectId, ref: "category", required : true},
    comments : {type: [commentSchema], default : []},
    likes : {type: [mongoose.Types.ObjectId],ref:'user', default : []},
    dislikes : {type: [mongoose.Types.ObjectId],ref:'user', default : []},
    bookmarks : {type: [mongoose.Types.ObjectId],ref:'user', default : []},
    price : {type: Number, default : 0},
    discount : {type: Number, default : 0},
    type : {type: String, required : true},
    format : {type: String},
    type : {type: String, required : true}, //virtual - physical
    format : {type: String},
    supplier : {type: mongoose.Types.ObjectId, ref:"user", required : true},
    features : {type: Object, default : {
        length : "",
        height : "",
        width : "",
        weight : "",
        colors : [],
        madein : ""
    }},

}, {
    toJSON : {virtuals : true}
})

productSchema.virtual('imagesUrl').get(function(){
   return this.images.map(item => (`${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${item}`))
})

productSchema.index({title : "text"})




module.exports = {
    productModel:  model("Product" , productSchema)
}
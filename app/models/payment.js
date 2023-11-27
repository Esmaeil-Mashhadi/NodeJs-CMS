const { default: mongoose } = require("mongoose");

const paymentSchema = new mongoose.Schema({
 invoiceNumber:{type:String},
 paymentDate : {type:String},
 amount  : {type:Number} ,
 description: {type:String},
 verify: {type:Boolean , default:false},
 authority : {type:String },
 user : {type: mongoose.Types.ObjectId , ref:'user'},
 basket : {type:Object , default:{}},
 refID : {type: String , default:undefined},
 cardHash: {type:String , default:undefined}
  
}, {timestamps:true})



module.exports = {
    paymentModel : mongoose.model('payment' , paymentSchema)
}
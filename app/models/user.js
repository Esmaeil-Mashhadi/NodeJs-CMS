const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name : {type : String},
    last_name : {type : String},
    username : {type : String, lowercase : true , lowercase:true},
    mobile : {type : String, required : true, unique: true},
    email : {type : String, lowercase : true , lowercase:true},
    password : {type : String},
    otp : {type : Object, default : {
        code : 0,
        expiresIn : 0
    }},
    bills : {type:[], default :[]},
    discount:{type:Number , default:0},
    birthday:{type:String},
    role :{type:String , default:'USER'},
    courses: {type:[mongoose.Types.ObjectId] , ref:"course"  , default :[]},
}, { timestamps: true} );

userSchema.index({first_name: "text", last_name: "text", username: "text", mobile: "text", email: "text"})
module.exports = {
    userModel : mongoose.model("user", userSchema)
}
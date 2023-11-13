const { Schema, default: mongoose } = require("mongoose");

const roleSchema = Schema({
    title : {type: String , unique: true},
    description: {type: String , default:"" },
    permissions: {type: [mongoose.Types.ObjectId] , ref:'permissions' , default :[]}
}, {toJson: {virtuals: true}})



module.exports = {
    roleModel : mongoose.model('roles' , roleSchema)
} 
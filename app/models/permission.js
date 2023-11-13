const mongoose= require("mongoose");

const permissionSchema = new mongoose.Schema({
    name: {type: String, unique: true},
    description: {type: String, default: ""}
}, {
    toJSON : {virtuals: true}
})

module.exports = {
    permissionsModel : mongoose.model('permissions', permissionSchema)
}
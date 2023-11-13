const Joi = require("joi");
const { MONGOID_PATERN } = require("../../../utils/constant");

const AddRoleSchema = Joi.object({
    title:Joi.string().min(3).max(30).error( new Error("please enter valid title (3-30 character)")),
    description:Joi.string().min(0).max(100).error( new Error("description must be at most 30 character)")),
    permissions : Joi.array().items(Joi.string().pattern(MONGOID_PATERN)).error(new Error("permissions are not valid"))
})
const AddPermissionSchema = Joi.object({
    name:Joi.string().min(3).max(30).error( new Error("please enter valid title (3-30 character)")),
    description:Joi.string().min(0).max(100).error( new Error("description must be at most 30 character)")),
})


module.exports ={
    AddRoleSchema ,AddPermissionSchema
}
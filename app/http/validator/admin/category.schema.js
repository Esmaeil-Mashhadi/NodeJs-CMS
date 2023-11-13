const Joi = require("joi");
const { MONGOID_PATERN } = require("../../../utils/constant");

const AddCategorySchema = Joi.object({
    title:Joi.string().min(3).max(30).error( new Error("please enter valid title (3-30 character)")),
    parent:Joi.string().pattern(MONGOID_PATERN).error(new Error("invalid data"))
})

const updateCategorySchema = Joi.object({
    title:Joi.string().min(3).max(30).error( new Error("please enter valid title (3-30 character)")),


})


module.exports ={
    AddCategorySchema , updateCategorySchema
}
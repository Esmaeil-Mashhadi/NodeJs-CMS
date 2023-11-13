const Joi = require("joi");
const { MONGOID_PATERN } = require("../../utils/constant");
const createHttpError = require("http-errors");


const ObjectIdValidator= Joi.object({
    id : Joi.string().pattern(MONGOID_PATERN).error(new Error(createHttpError.BadRequest("id is not valid")))

})


module.exports ={
    ObjectIdValidator
}
const createHttpError = require("http-errors");
const Joi = require("joi");
const { MONGOID_PATERN } = require("../../../utils/constant");

const productSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createHttpError.BadRequest("title is not valid (should be between 3 to 30 character)")),
    text:Joi.string().empty().error(createHttpError.BadRequest("text is invalid")),
    short_text:Joi.string().empty().error(createHttpError.BadRequest("short text is not valid")),
    tags:Joi.array().min(0).max(20).error(createHttpError.BadRequest("tags can't be empty or higher than 20")),
    category:Joi.string().pattern(MONGOID_PATERN).error(createHttpError.BadRequest("couldn't find the category")),
    type: Joi.string().error(createHttpError.BadRequest("type must be physical or virtual")),
    price: Joi.number().error(createHttpError.BadRequest("price is not valid")),
    count: Joi.number().error(createHttpError.BadRequest("count is not valid")),
    discount: Joi.number().error(createHttpError.BadRequest("discount is not valid")),
    height: Joi.number().allow('').error(createHttpError.BadRequest("height is not valid")),
    weight: Joi.number().allow('').error(createHttpError.BadRequest("weight is not valid")),
    length: Joi.number().allow('').error(createHttpError.BadRequest("length is not valid")),
    width: Joi.number().allow('').error(createHttpError.BadRequest("width is not valid")),
    featuers: Joi.object().allow(),
    filename:Joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(createHttpError.BadRequest("image format is not valid")),
    fileUploadPath:Joi.allow(),
    colors:Joi.array().min(0).error(new Error(createHttpError.BadRequest("colors is not valid"))),
    images:Joi.allow()
})



module.exports = {
    productSchema
}
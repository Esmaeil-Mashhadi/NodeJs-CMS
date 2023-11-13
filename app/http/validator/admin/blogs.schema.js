const Joi = require("joi");
const { MONGOID_PATERN } = require("../../../utils/constant");
const createHttpError = require("http-errors");

const createBlogSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createHttpError.BadRequest("title is not valid (should be between 3 to 30 character)")),
    text:Joi.string().empty().error(createHttpError.BadRequest("text is invalid")),
    short_text:Joi.string().empty().error(createHttpError.BadRequest("short text is not valid")),
    filename:Joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(createHttpError.BadRequest("image format is not valid")),
    tags:Joi.array().min(0).max(20).error(createHttpError.BadRequest("tags can't be empty or higher than 20")),
    category:Joi.string().pattern(MONGOID_PATERN).error(createHttpError.BadRequest("couldn't find the category")),
    fileUploadPath:Joi.allow(),
    image:Joi.allow()
})


module.exports = {
    createBlogSchema
}
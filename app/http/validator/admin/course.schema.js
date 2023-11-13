const createHttpError = require("http-errors");
const Joi = require("joi");
const { MONGOID_PATERN } = require("../../../utils/constant");

const courseSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createHttpError.BadRequest("title is not valid (should be between 3 to 30 character)")),
    text:Joi.string().empty().error(createHttpError.BadRequest("text is invalid")),
    short_text:Joi.string().empty().error(createHttpError.BadRequest("short text is not valid")),
    tags:Joi.array().min(0).max(20).error(createHttpError.BadRequest("tags can't be empty or higher than 20")),
    category:Joi.string().pattern(MONGOID_PATERN).error(createHttpError.BadRequest("couldn't find the category")),
    type: Joi.string().error(createHttpError.BadRequest("type must be cash or special or free")),
    price: Joi.number().error(createHttpError.BadRequest("price is not valid")),
    count: Joi.number().error(createHttpError.BadRequest("count is not valid")),
    discount: Joi.number().error(createHttpError.BadRequest("discount is not valid")),
    featuers: Joi.object().allow(),
    filename:Joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(createHttpError.BadRequest("image format is not valid")),
    fileUploadPath:Joi.allow(),
    images:Joi.allow(),
    time: Joi.allow()
})
const episodeSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createHttpError.BadRequest("title is not valid (should be between 3 to 30 character)")),
    text:Joi.string().empty().error(createHttpError.BadRequest("text is invalid")),
    type: Joi.string().error(createHttpError.BadRequest("type must be cash or special or free")),
    chapterID:Joi.string().pattern(MONGOID_PATERN).error(createHttpError.BadRequest("chpaterID is not valid ")),
    courseID:Joi.string().pattern(MONGOID_PATERN).error(createHttpError.BadRequest("courseID is not valid")),
    filename:Joi.string().pattern(/(\.mp4|\.mpeg|\.mkv|\.mov|\.mpg)$/).error(createHttpError.BadRequest("video format is not valid")),
    fileUploadPath:Joi.allow(),

    
})



module.exports = {
    courseSchema , episodeSchema
}
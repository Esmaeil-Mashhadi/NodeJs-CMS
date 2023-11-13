const Joi = require("joi")

const getOtpSchema =Joi.object({
  mobile:Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("please Enter Iran mobile phone")),
  
})

const checkOtpSchema = Joi.object({
  mobile:Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("please Enter Iran mobile phone")),
  code: Joi.string().min(4).max(6).error(new Error("sent code is not valid"))
})


module.exports = {
  getOtpSchema , checkOtpSchema
}
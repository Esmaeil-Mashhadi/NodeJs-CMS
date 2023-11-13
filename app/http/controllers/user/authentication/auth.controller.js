const createHttpError = require("http-errors")
const { getOtpSchema, checkOtpSchema } = require("../../../validator/user/auth.schema")
const { userModel } = require("../../../../models/user")
const Controller = require("../../controller")
const { ROLES } = require("../../../../utils/constant")
const { randomNumberGenrator } = require("../../../../utils/functions/utilityFunctions")
const {SignAccessToken , SignRefreshToken} = require('../../../../utils/functions/authFunctions')

class UserAuthController extends Controller{

async saveUser(mobile , code){
          let otp = {
              code,
              expiresIn : new Date().getTime() + 120000000
          }

        const user = await userModel.findOne({mobile})

        if(user){
            const invalidData = ['' , ' ' , null , undefined , "0" , NaN]
            Object.keys(otp).forEach((key)=>{
                if(invalidData.includes(otp[key])){
                    delete otp[key]
                }
            })

            const updateResult = await userModel.updateOne({mobile} , {$set: {otp}})
            if(updateResult.modifiedCount == 0){
                throw createHttpError[400]("failed to resend the code")
            }
            return true
            
        } else {
            return await userModel.create({
                mobile , otp , roles:ROLES.USER
            })
        }

         }

      
async getOtp(req , res ,next){

try {
    await getOtpSchema.validateAsync(req.body)
    const code = randomNumberGenrator()
    

    const {mobile} = req.body

    const result = await this.saveUser(mobile , code)
    if(!result){
        throw createHttpError.Unauthorized('failed to login')
    }

     return  res.status(200).json({status:200 , success:true , message:"verification code sent successfully" , code , mobile})
    
} catch (error) {
    next(error)}

}

async checkOtp(req , res ,next){
    try {
        await checkOtpSchema.validateAsync(req.body)
        const {mobile , code} = req.body
        
      

        const user = await userModel.findOne({mobile})
        if(!user){
            throw createHttpError.NotFound("user doesn't exist")
        };
    

        if(user.otp.code != code){
          throw  createHttpError.Unauthorized('code is invalid')
        }
      
        const now = Date.now()
        
        if(+user.otp.expiresIn < now){
            throw createHttpError.Unauthorized("your code has expired try again")
        }


        const accessToken = await SignAccessToken(user._id)
        const refreshToken = await SignRefreshToken(user._id)
        return res.json({
            data:{
                accessToken,
                refreshToken
            }
        })

    } catch (error) {
        next(error)
    }
}


async refreshToken (req , res , next){
    try {
        const {refreshToken} = req.body
      const mobile = await  verifyRefreshToken(refreshToken)
      const user = await userModel.findOne({mobile})
      const accessToken = await SignAccessToken(user._id)
      const newRefreshToken = await SignRefreshToken(user._id)
        
      return res.json({
        data :{
            accessToken,
            refreshToken : newRefreshToken
        }
      })

    } catch (error) {
        next(error)
    }
}
}






module.exports = {
    UserAuthController : new UserAuthController()
}
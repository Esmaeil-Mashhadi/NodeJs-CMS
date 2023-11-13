const createHttpError = require("http-errors");
const { sign, verify } = require("jsonwebtoken");
const redisClient = require('../init_redis')
const { userModel } = require("../../models/user");
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require("../constant");


function SignAccessToken(userID){

    return new Promise(async(resolve , reject)=>{
      
        const user =  await userModel.findById(userID)
     
        const payloadObject = {
            mobile: user.mobile,
        };


        const secret  = ACCESS_TOKEN_SECRET_KEY
        const options = {expiresIn: '1d'}
        sign(payloadObject ,secret, options , (err, token)=>{
            if(err){
                createHttpError.InternalServerError("Something went wrong on server")
            }
            
            resolve(token)
        })
    })
}


function SignRefreshToken(userID){
    return new Promise(async(resolve , reject)=>{
        const user =  await userModel.findById(userID)
        const payloadObject = {
            mobile: user.mobile,
        };

        const secret  = REFRESH_TOKEN_SECRET_KEY
        const options = {expiresIn: '1y'}
        sign(payloadObject ,secret, options , async(err, token)=>{
            if(err){
                createHttpError.InternalServerError("Something went wrong on server")
            }
            await redisClient.SETEX(userID +"" ,365*24*60*60 ,token)
            resolve(token)
        })
    })
} 

async function verifyRefreshToken(token){
    
    const result = verify(token , REFRESH_TOKEN_SECRET_KEY);
     if(result){
           const {mobile} = result
           const user = await userModel.findOne({mobile} ,{password:0 , token:0 , otp:0})
           if(!user){
                      throw createHttpError.Unauthorized("user not found")
                  }
  
                  const refreshToken = await redisClient.get(user._id +"")
                  if(token === refreshToken){
                      return mobile 
                  }else{
                      throw createHttpError.Unauthorized("failed to log in")
                  }
              }
              return createHttpError.Unauthorized("sign in first")
  }



module.exports = {
    SignAccessToken,
    SignRefreshToken,
    verifyRefreshToken,
}

const createHttpError = require("http-errors")
const { userModel } = require("../../models/user");
const { verify } = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/constant");

function getToken(headers){
    if(headers.authorization){
        const [bearer , token] = headers?.authorization.split(" ") || []
        if(token && bearer.toLowerCase() == "bearer"){
            return [bearer , token]
        }
    }
    throw  createHttpError.Unauthorized('unauthorized action , Register first')
}

async function verifyAccessToken(req , res ,next){
    
    try { 
        const [bearer , token] = getToken(req.headers)
        if(token && bearer.toLowerCase() == "bearer"){
     
            const result = verify(token , ACCESS_TOKEN_SECRET_KEY , (err , payload)=>{
                if(err) throw createHttpError.NotFound('please login first')
                return payload
            })

            
    
            if(result){
                const {mobile} = result
                const user = await userModel.findOne({mobile} ,{password:0 , token:0 , otp:0})
                if(!user){
                    throw createHttpError.Unauthorized("user not found")
                }
                req.user = user
                return next()
            } else {
                throw createHttpError.NotFound("user doesn't exist")
            }
        }
 

    } catch (error) {
        next(error)
    }
  
    }


async function verifyAccessTokenInGraphql(req , res){
        
        try { 
            const [bearer , token] = getToken(req.headers)
            if(token && bearer.toLowerCase() == "bearer"){
         
                const result = verify(token , ACCESS_TOKEN_SECRET_KEY , (err , payload)=>{
                    if(err) throw createHttpError.NotFound('please login first')
                    return payload
                })
    
                
        
                if(result){
                    const {mobile} = result
                    const user = await userModel.findOne({mobile} ,{password:0 , token:0 , otp:0})
                    if(!user){
                        throw createHttpError.Unauthorized("user not found")
                    }
                    return user
                } else {
                    throw createHttpError.NotFound("user doesn't exist")
                }
            }
     
    
        } catch (error) { 
            throw  createHttpError.Unauthorized()
        }
      

    }
    
    
    





module.exports = {
        verifyAccessToken ,
        verifyAccessTokenInGraphql
    }

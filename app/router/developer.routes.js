const { genSaltSync, hash, hashSync } = require("bcrypt");
const { Router } = require("express");

const router = Router()

router.get("/password-hash/:password" , (req , res , next)=>{
    const {password} = req.params
    const salt = genSaltSync(10)
    const hash = hashSync(password , salt)
    if(hash){
        return res.send(hash)
    }
})
/**
 * @swagger
 * tags:
 *  name: Developer-Routes
 *  description: developer utils
 * 
 * /developer/password-hash/{password}:
 *      get: 
 *          summary: it helps developer to hash 
 *          tags: [Developer-Routes]
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: password
 *                  required: true
 *          responses:
 *              200:
 *                  desciption: success
 */

router.get("/random-number" , (req , res , next)=>{
    return res.send(randomNumberGenrator().toString())
})
/**
 * @swagger
 * tags:
 *  name: Developer-Routes
 *  description: developer utils
 * 
 * /developer/random-number:
 *      get: 
 *          summary: it creates random number 
 *          tags: [Developer-Routes]
 *          responses:
 *              200:
 *                  desciption: success
*/






module.exports ={
    developerRoutes : router
}
const { Router } = require("express");
const { UserAuthController } = require("../../http/controllers/user/authentication/auth.controller");

const router = Router()
//component config
/**
 * @swagger
 * components: 
 *   schemas:    
 *      GetOTP: 
 *        type: object
 *        required: 
 *          - mobile
 *        properties:
 *          mobile:
 *            type: string
 *            description: the user mobile for Registration
 *  
 *      checkOTP: 
 *        type: object
 *        required:
 *          - mobile
 *          - code
 *        properties: 
 *          mobile:
 *            type: string
 *            description: mobile which received the code
 *          code: 
 *            type: string
 *            description: received code from getOTP
 * 
 *      refreshToken: 
 *          type: object
 *          required:
 *              - refreshToken
 *          properties: 
 *              refreshToken: 
 *                  type: string
 *                  description: enter refresh token
 * 
 *              
 *          
 *      
 */
//component config


router.post('/get-otp', UserAuthController.getOtp)
/**
 * @swagger
 * tags:
 *   - name: User-Authentication
 *     description: Login page authentication
 * 
 * /user/get-otp:
 *   post: 
 *     summary: creating OTP in the database
 *     tags: [User-Authentication]
 *     description: Get OTP
 *     requestBody: 
 *       required: true
 *       content: 
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: "#/components/schemas/GetOTP"
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/GetOTP"              
 *     responses: 
 *       '201':
 *         description: Success
 *       '400':
 *         description: Bad request
 *       '401': 
 *         description: Unauthorized
 *       '500': 
 *         description: Internal Server Error
 */

router.post('/check-otp' , UserAuthController.checkOtp)
/**
 * @swagger
 * tags:
 *  name: User-Authentication
 *  description: Login page authentication
 * 
 * 
 * /user/check-otp:
 *      post: 
 *          summary: check otp value
 *          tags: [User-Authentication]
 *          description: it check and validate otp
 *          requestBody: 
 *              required: true
 *              content: 
 *                application/x-www-form-urlencoded:
 *                  schema:
 *                    $ref: "#/components/schemas/checkOTP"
 *                application/json:
 *                  schema:
 *                    $ref: "#/components/schemas/checkOTP"       
 *                         
 *                    
 *          responses: 
 *              '201': 
 *                  description: success
 *              '400':
 *                  description: bad request
 *              '401': 
 *                  description: Unauthorization
 *              '500': 
 *                  description : Internal Server Error
*/

router.post('/refresh-token' , UserAuthController.refreshToken)
/**
 * @swagger
 * tags :
 *   name: User-Authentication 
 *   description: refresh-tokon-creation

 * /user/refresh-token:
 *      post:
 *          tags : [User-Authentication]
 *          summary: refresh token 
 *          description: sending refresh token for getting new token and referesh token
 *          requestBody: 
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded: 
 *                      schema :  
 *                          $ref: "#/components/schemas/refreshToken"
 *                  application/json: 
 *                      schema: 
 *                          $ref: "#/components/schemas/refreshToken"
 *                         
 *          responses:
 *                  200: 
 *                      description: success
 * 
 */


 
module.exports ={
    UserAuthRoutes : router
}
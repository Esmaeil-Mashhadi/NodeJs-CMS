const { StatusCodes } = require("http-status-codes")
const { userModel } = require("../../../../models/user")
const {deleteInvalidData} = require('../../../../utils/functions/utilityFunctions');
const createHttpError = require("http-errors");

class UserController {

     getAllUsers = async(req, res, next)=>{
        try {
            const {search} = req.query;
            const databaseQuery = {};
            if(search) databaseQuery['$text'] = {$search : search}
            const users = await userModel.find(databaseQuery);
            return res.status(StatusCodes.OK).json({
                statusCode : StatusCodes.OK,
                data: {users}
            })
        } catch (error) {
            next(error)
        }
    }

    updateUserProfile= async(req ,res , next)=>{
        try {
            const userID = req.user._id
            const data = req.body
            const blackListData = ['courses' , 'mobile' , 'otp'  , 'courses' , 'bills' , 'Roles']
            deleteInvalidData(data , blackListData)
            const result = await userModel.updateOne({_id:userID}, {$set : data})
            if(result.modifiedCount == 0) throw createHttpError.InternalServerError("failed to update Profile")
            return res.status(StatusCodes.OK).json({
                statusCode:StatusCodes.OK, 
                data :{
                    message: "User profile updated successfully"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    getProfile= async(req ,res , next)=>{
        try {
            const user = req.user

            return res.status(StatusCodes.OK).json({
                statusCode:StatusCodes.OK, 
                data :{
                    user
                }
            })
        } catch (error) {
            next(error)
        }
    }
}









module.exports = {
    UserController : new UserController()
}
const { permissionsModel } = require("../../../../models/permission")
const {StatusCodes} =require('http-status-codes')
const { AddPermissionSchema } = require("../../../validator/admin/RBAC.schema")
const { checkPermissionExistence, findPermissionWithId } = require("../../../../utils/functions/dataBaseFunctions")
const createHttpError = require("http-errors")
const { deleteInvalidData } = require("../../../../utils/functions/utilityFunctions")
class PermissionsController {

    addPermission = async(req, res , next)=>{

        try {
            const {name, description} = await AddPermissionSchema.validateAsync(req.body);
            await checkPermissionExistence(name) 

            const permission = await permissionsModel.create({ name, description }) 
            
            if(!permission) throw createHttpError.InternalServerError("failed to add a new permission")
            return res.status(StatusCodes.CREATED).json({
                StatusCode : StatusCodes.CREATED,
                data:{
                    message:"permission added successfully"
                }
            })
        } catch (error) { 
            next(error)
        }
       
    }

    getAllPermissions = async(req , res , next)=>{
        try {
            const permissions = await permissionsModel.find({})
            return res.status(StatusCodes.OK).json({
                message: StatusCodes.OK,
                data :{
                    permissions
                }
            })
        } catch (error) {
            next(error)
        }
    }



    removePermission = async(req , res , next)=>{
        try {
             const {id} = req.params
             await findPermissionWithId(id)
             const result = await permissionsModel.deleteOne({_id: id})
             if(result.deletedCount == 0) throw createHttpError.InternalServerError("failed to delete permission")
             return res.status(StatusCodes.OK).json({
                StatusCode:StatusCodes.OK , 
                data: {
                    message:"permission removed successfully"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    editPermission = async(req , res , next)=>{
        try {
            const {id} = req.params
            const data =req.body
             deleteInvalidData(data ,[])
            await findPermissionWithId(id)
            const result = await permissionsModel.updateOne({_id: id} , {$set: data})
            if(result.modifiedCount == 0 ) throw createHttpError.InternalServerError('failed to updated permission')
            return res.status(StatusCodes.OK).json({
                StatusCode : StatusCodes.OK,
                data: {
                    message: "permission updated successfully"
                }
        })
        } catch (error) {
           next(error) 
        }
    }


}







module.exports = {
    PermissionsController : new PermissionsController()
}
const { StatusCodes } = require("http-status-codes")
const { AddRoleSchema } = require("../../../validator/admin/RBAC.schema")
const createHttpError = require("http-errors")
const { checkRoleExistence, findRoleWithIdOrTitle } = require("../../../../utils/functions/dataBaseFunctions")
const { roleModel } = require("../../../../models/role")
const { deleteInvalidData, objectCopy } = require("../../../../utils/functions/utilityFunctions")

class RoleController {

    addNewRole = async(req, res , next)=>{

        try {
            const {title , permissions , description} = await AddRoleSchema.validateAsync(req.body);
            await checkRoleExistence(title) 
            const role = await roleModel.create({title , permissions , description})
            if(!role) throw createHttpError.InternalServerError("failed to add a new role")
            return res.status(StatusCodes.CREATED).json({
                StatusCode : StatusCodes.CREATED,
                data:{
                    message:"role added successfully"
                }
            })
        } catch (error) {
            next(error)
        }
      
    }
    
    getAllRoles = async(req , res , next)=>{
        try {
                const roles = await roleModel.find({}).populate([{path:"permissions"}])
                return res.status(StatusCodes.OK).json({
                    StatusCode : StatusCodes.OK,
                    data:{roles}

                })
        } catch (error) {
            next(error)
        }
    }

 

    removeRole = async(req ,res ,next)=>{
        try {
            const {field} = req.params
            const role = await findRoleWithIdOrTitle(field)
            const Result = await roleModel.deleteOne({_id:role._id})
            if(!Result.deletedCount == 0) throw createHttpError.InternalServerError("failed to delete result ")
            return res.status(StatusCodes.OK).json({
                StatusCode: StatusCodes.OK, 
                data: {
                    message: 'role removed successfully'
                }
            })
        } catch (error) {
            next(error)
        }
    }

    editRole = async(req , res , next)=>{
        try {
            const {id} = req.params
            const data =req.body
             deleteInvalidData(data ,[])
    
            const role = await findRoleWithIdOrTitle(id)
            const result = await roleModel.updateOne({_id: id} , {$set: data})
           
            if(result.modifiedCount == 0 ) throw createHttpError.InternalServerError('failed to updated role')
            return res.status(StatusCodes.OK).json({
                StatusCode : StatusCodes.OK,
                data: {
                    message: "role updated successfully"
                }
        })
        } catch (error) {
           next(error) 
        }
    }


}



module.exports = {
    RoleController : new RoleController()
}
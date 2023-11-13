const createHttpError = require("http-errors")
const { permissionsModel } = require("../../models/permission")
const { roleModel } = require("../../models/role")
const { PERMISSIONS } = require("../../utils/constant")

function checkPermission(requiredPermissions = []){

    return async function(req , res , next){
        try {

            const allPermissions = requiredPermissions.flat(2)
            const user = req.user
            const role = await roleModel.findOne({title : user.role})

            const permissions = await permissionsModel.find({_id: {$in : role.permissions}})

            const permissionName = permissions.map(item =>  (item.name))
      
            const checkPermission = allPermissions.every(item => {
                return permissionName.includes(item)
            })

            if(permissionName.includes(PERMISSIONS.All)) return next()
            if( allPermissions.length == 0 || checkPermission){
                return next()
            } 
            throw createHttpError.Forbidden("you can't access to this address")
           
        } catch (error) {
            next(error)
        }
    }
}


module.exports = {
    checkPermission
}
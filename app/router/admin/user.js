const { Router } = require("express");
const { UserController } = require("../../http/controllers/admin/users/user.controller");
const { checkPermission } = require("../../http/middlewares/permission.guard");
const { PERMISSIONS } = require("../../utils/constant");

const router= Router()


router.get("/list" , checkPermission([PERMISSIONS.ADMIN]) , UserController.getAllUsers)
router.patch("/update-profile" , UserController.updateUserProfile)
router.get('/profile'  , UserController.getProfile)


module.exports = {
    adminUserRoutes : router
}
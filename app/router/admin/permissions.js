const { Router } = require("express");
const { PermissionsController } = require("../../http/controllers/admin/RBAC/permission.controller");
const permissionController = require("../../http/controllers/admin/RBAC/permission.controller");

const router = Router()

router.get("/list" , PermissionsController.getAllPermissions)
router.post("/add" , PermissionsController.addPermission)
router.delete("/remove/:id" , PermissionsController.removePermission)
router.patch("/edit/:id" , PermissionsController.editPermission)




 


module.exports = {
    AdminPermissionsRoutes : router
}
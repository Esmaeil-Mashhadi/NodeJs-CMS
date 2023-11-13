const { Router } = require("express");
const { RoleController } = require("../../http/controllers/admin/RBAC/role.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");

const router = Router()

router.get("/list" , RoleController.getAllRoles)
router.post("/add" , stringToArray('permissions') , RoleController.addNewRole)
router.delete("/remove/:field" , RoleController.removeRole)
router.patch("/edit/:id" , stringToArray('permissions') ,  RoleController.editRole)






module.exports = {
    AdminRoleRoutes : router
}
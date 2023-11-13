const { Router } = require("express");
const { model } = require("mongoose");
const { CategoryController } = require("../../http/controllers/admin/category/category.controller");

const router = Router()

router.post('/add' , CategoryController.addCategory)
router.get("/parents", CategoryController.getAllParents)
router.get('/all' , CategoryController.getAllCategory)
router.get("/children/:parent" , CategoryController.getChildParent)
router.delete("/remove/:id", CategoryController.removeCategory)
router.get('/:id' , CategoryController.getCategoryById)
router.patch('/update/:id' , CategoryController.editCategory)


module.exports ={
    adminCategoryRoutes : router
}
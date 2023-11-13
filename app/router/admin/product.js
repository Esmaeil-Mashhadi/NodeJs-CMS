const { Router } = require("express");
const { multerImageUpload } = require("../../utils/multer");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const {productController} = require("../../http/controllers/admin/product/product.controller");
const router = Router()


router.post('/add', multerImageUpload.array("images" , 3) ,stringToArray('tags' , 'colors'), productController.addProduct)
router.get("/list" ,productController.getAllProducts )
router.get("/:id" ,productController.getProductById )
router.delete("/remove/:id" , productController.removeProduct)
router.patch('/edit/:id', multerImageUpload.array("images" , 3) ,stringToArray('tags' , 'colors'), productController.editProduct)


module.exports = {
    adminProductRoutes : router
}
const { Router } = require("express");
const { multerImageUpload } = require("../../utils/multer");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { AdminBlogController } = require("../../http/controllers/admin/blog/blog.controller");
const router =Router()


router.get('/' , AdminBlogController.getListofBlogs)
router.get("/:id" , AdminBlogController.getOneBlogById)
router.post('/add' ,multerImageUpload.single('image') , stringToArray("tags"), AdminBlogController.createBlog)
router.delete('/:id' , AdminBlogController.deleteBlog)
router.patch('/:id',multerImageUpload.single("image") , stringToArray('tags') , AdminBlogController.editBlog)



module.exports ={
    adminBlogRoutes : router
}
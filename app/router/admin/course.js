const { Router } = require("express");
const { CourseController } = require("../../http/controllers/admin/course/course.controller");
const { multerImageUpload } = require("../../utils/multer");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const courseController = require("../../http/controllers/admin/course/course.controller");
const chapterController = require("../../http/controllers/admin/course/chapter.controller");

const router = Router()


router.post('/add', multerImageUpload.single('image') , stringToArray('tags') , CourseController.addCourse)
router.get("/list" , CourseController.getListofCourses)
router.get('/list/:id' , CourseController.getCourseById)
router.patch('/edit/:id' , multerImageUpload.single("image") , CourseController.updateCourse)



module.exports ={
    adminCourseRouters : router
}
const { Router } = require("express");
const {AdminChapterController} = require("../../http/controllers/admin/course/chapter.controller");

const router = Router()

router.put('/add-chapter'  , AdminChapterController.addChapter)
router.get('/list/:courseID' , AdminChapterController.getCourseChapters)
router.patch('/update/:chapterID' , AdminChapterController.updateChapterByid)
router.patch('/remove/:chapterID' , AdminChapterController.removeChapterById)








module.exports = {
    adminChapterRouter  : router
}
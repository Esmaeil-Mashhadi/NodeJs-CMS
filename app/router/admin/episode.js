const { Router } = require("express");
const { EpisodesController } = require("../../http/controllers/admin/course/episode.controller");
const { multerVideoUpload } = require("../../utils/multer");

const router = Router()


router.post("/add", multerVideoUpload.single('video') , EpisodesController.addEpisode)
router.delete('/remove/:episodeID' , EpisodesController.removeEpisode)
router.patch('/edit/:episodeID' , multerVideoUpload.single('video') , EpisodesController.editEpisode)









module.exports ={
    adminEpisodeRoute : router
}
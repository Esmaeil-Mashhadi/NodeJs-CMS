const { default: getVideoDurationInSeconds } = require("get-video-duration")
const { episodeSchema } = require("../../../validator/admin/course.schema")
const  path = require('path')
const { CourseModel } = require("../../../../models/course")
const {StatusCodes} = require('http-status-codes')
const { ObjectIdValidator } = require("../../../validator/public.validator")
const createHttpError = require("http-errors")
const { getVideoTime, deleteFileInPublic, deleteInvalidData } = require("../../../../utils/functions/utilityFunctions")
const { getOneEpisode } = require("../../../../utils/functions/dataBaseFunctions")

class EpisodesController {
  addEpisode = async(req , res , next)=>{
    try {
       const {title , text , chapterID ,courseID , filename , fileUploadPath , type} = await episodeSchema.validateAsync(req.body)
       const videoAddress = path.join(fileUploadPath , filename).replace(/\\/g , "/")
       const videoURL = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${videoAddress}`
       const seconds = await getVideoDurationInSeconds(videoURL)
       const time = getVideoTime(seconds)
       const episode = {
        title , text , videoAddress , time ,type
       }
       const result = await CourseModel.updateOne({_id:courseID , 'chapters._id' : chapterID } , {$push:{'chapters.$.episodes' :episode }} , {$upsert: true})
       if(result.modfiedCount == 0) throw new createHttpError.InternalServerError("failed to add episode")

       return res.status(StatusCodes.CREATED).json({
        statusCode : StatusCodes.CREATED,
        data:{
           message: "episode created successfully"
        }
       })


    } catch (error) {
        next(error)
    }
  }

  removeEpisode = async(req,  res ,next)=>{
    try {
      const {episodeID} = req.params
      await ObjectIdValidator.validateAsync({id:episodeID})
      const result = await CourseModel.updateOne({'chapters.episodes._id' : episodeID}, {$pull :{'chapters.$.episodes' : {_id:episodeID}}})
      if(result.modifiedCount == 0 ) throw new createHttpError.InternalServerError("failed to remove episde")
      return res.status(StatusCodes.OK).json({
        statusCode : StatusCodes.OK ,
        data:{
          message:"episode removed successfully"
        }
      })

    } catch (error) {
      next(error)
    }
  }

  editEpisode = async (req , res ,next)=>{
    try {
      let blackListFields = ["_id"]
      const {episodeID} = req.params
      await ObjectIdValidator.validateAsync({id: episodeID})
      const { filename , fileUploadPath} = req.body

      if(filename && fileUploadPath){
        const fileAddress = path.join(fileUploadPath , filename)
        const videoAddress = fileAddress.replace(/\\/g , "/")
        const videoUrl = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${videoAddress}`
        const seconds = await getVideoDurationInSeconds(videoUrl)
        req.body.videoAddress = videoAddress
        req.body.time = getVideoTime(seconds)

        blackListFields.push('filename')
        blackListFields.push('fileUploadPath')
      }else{
        blackListFields.push('time')
        blackListFields.push('videoAddress')
      }
      const data = req.body
      deleteInvalidData(data , blackListFields)
      const episode = await getOneEpisode(episodeID)
      const result = await CourseModel.updateOne({'chapters.episodes._id':episodeID} , {$set: {"chapters.$.episodes" : {...episode , ...data}}})
      if(result.modifiedCount == 0) throw createHttpError.InternalServerError("failed to edit episode")
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data:{
          message:"episode successfully updated"
        }
      })
    } catch (error) {
      deleteFileInPublic(req.body.videoUrl)
      next(error)
    }
  }


}




module.exports = {
    EpisodesController : new EpisodesController()
}
const createHttpError = require("http-errors");
const { CourseModel } = require("../../../../models/course");
const Controller = require("../../controller");
const { StatusCodes } = require("http-status-codes");
const { checkCourseExistence, checkChapterExistence } = require("../../../../utils/functions/dataBaseFunctions");
const { deleteInvalidData, objectCopy } = require("../../../../utils/functions/utilityFunctions");

class ChapterController extends Controller { 
    async addChapter(req , res ,next){
        try {
            const {id , title , text} = req.body
            await checkCourseExistence(id)
            const chapterResult = await CourseModel.updateOne({_id: id}, {$push: {
                chapters:{ title , text , episodes:[]}
            }})

            if(chapterResult.modifiedCount == 0){
                throw createHttpError.InternalServerError("failed to add chapter")
            }

            return res.status(StatusCodes.CREATED).json({
                statusCode : StatusCodes.CREATED,
                data:{
                    message:"chapter created successfully"
                }
            })



        } catch (error) {
            next(error)
        }
    }

    async getCourseChapters(req ,res , next){
        try {
            const {courseID} = req.params
            await checkCourseExistence(courseID)    
            const chapters = await CourseModel.findOne({_id:courseID}, {chapters: 1 , title:1})
            if(!chapters) throw createHttpError.NotFound("there is not chapter in the course")

            return res.status(StatusCodes.OK).json({
                statusCode : StatusCodes.OK, 
                data :{
                    chapters
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async removeChapterById(req , res , next){
        try {
            const {chapterID} = req.params;
            await checkChapterExistence(chapterID)
            const result = await CourseModel.updateOne({'chapters._id' : chapterID} , {$pull: {chapters : {_id:chapterID}}})
            if(result.modifiedCount == 0) throw createHttpError.InternalServerError("failed to remove chapter")
            return res.status(StatusCodes.OK).json({
             statusCode:StatusCodes.OK ,
              data:{
              message: "chapter removed successfully"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async updateChapterByid(req ,res, next){
        try {
            const {chapterID} = req.params
          
            const chapter = await checkChapterExistence(chapterID);
            const data =req.body
            deleteInvalidData(data , ["-id"])
            if(!Object.keys(data).length){
                throw createHttpError.Forbidden("cant save invalid empty data")
            }

            const {chapters} = objectCopy(chapter)
            const [chapterLastData] = chapters
            const result = await CourseModel.updateOne({'chapters._id' : chapterID} , {$set:{
               'chapters.$':  {...chapterLastData , ...data}
            }})

            

            if(result.modifiedCount == 0 ) throw createHttpError.InternalServerError("failed to updated chapter")
            return res.status(StatusCodes.OK).json({
                statusCode : StatusCodes.OK,
                data : {
                    message:"chapter updated successfully"
                }
            })
        } catch (error) {
            next(error)
        }
    }
}


module.exports = {
    AdminChapterController : new ChapterController()
}
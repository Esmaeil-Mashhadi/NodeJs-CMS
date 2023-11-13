const { StatusCodes } = require("http-status-codes");
const { CourseModel } = require("../../../../models/course");
const Controller = require("../../controller");
const path = require('path');
const { courseSchema } = require("../../../validator/admin/course.schema");
const createHttpError = require("http-errors");
const { checkCourseExistence } = require("../../../../utils/functions/dataBaseFunctions");
const { deleteInvalidData } = require("../../../../utils/functions/utilityFunctions");
class CourseController extends Controller{
    async addCourse(req , res , next){
        try {

            await courseSchema.validateAsync(req.body)
            const {title , short_text , text , tags , category  , price , discount , type ,fileUploadPath , filename} = req.body;
            const image = path.join(fileUploadPath , filename).replace(/\\/g , '/')
            if(Number(price)>0 && type == "free"){
                throw  createHttpError.BadRequest("cant set price for free course")
            }
            const course = await CourseModel.create({
                    title , short_text , text , tags , category  , type,
                    price , discount , image  , status:"notStarted" , 
                    teacher : req.user._id
            })
            if(course._id){
                res.status(StatusCodes.CREATED).json({
                    statusCode : StatusCodes.CREATED ,
                    data:{
                        message:"course created successfully"
                    }
                })
            }else{
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    message:"failed to create course"
                })
            }
            
        } catch (error) {
            next(error)
        }
    }


   async getListofCourses(req , res ,next){
        try {
            const {search} = req.query;
            let courses
            if(search){
                courses = await CourseModel.find({$text :{$search: search}}).populate([
                    {path: "category" , select:{title: 1}},
                    {path: "teacher" , select : {first_name: 1 , last_name: 1 , mobile: 1 , email: 1}}
                ]).sort({_id: -1})
            }else{
                courses = await CourseModel.find({}).populate([
                    {path: "category" , select:{title: 1}},
                    {path: "teacher" , select : {first_name: 1 , last_name: 1 , mobile: 1 , email: 1 , _id:0}}
                ]).sort({_id: -1})
            }
            return res.status(StatusCodes.OK).json({
                statusCode : StatusCodes.OK , 
                data : {courses}

            })
        } catch (error) {
            next(error)
        }
    }

    async getCourseById(req , res , next){
        try {
            const {id} = req.params
            const course = await CourseModel.findOne({_id:id})
            if(!course){
                throw createHttpError.NotFound("failed to find course")
            }
           
            return res.status(StatusCodes.OK).json({
                statusCode:StatusCodes.OK,
                data: {
                    course
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async updateCourse(req ,res , next){
        try {
            const {id} = req.params
            const course =  await checkCourseExistence(id)
            const {filename , fileUploadPath} = req.body
            const data = req.body

            let blackListField = ['time' , 'chapters' , 'episodes' , 'bookmark' , 'likes' , 'dislikes' , 'comments' , 'filename' , 'fileUploadPath']
            deleteInvalidData(data , blackListField)
            if(req.file){
                data.image = path.join(fileUploadPath , filename)
                deleteFileInPublic(course.image)
            }

            const result = await CourseModel.updateOne({_id:id} , {$set:data})
            if(result.modifiedCoutn == 0) throw createHttpError.InternalServerError('failed to update cousre')

            return res.status(StatusCodes.OK).json({
                statusCode : StatusCodes.OK , 
                data : {
                    message : "cousre updated successfullly"
                }
            })

           
        } catch (error) {
          next(error)
        }
      }


}






module.exports = {
    CourseController : new CourseController()
}
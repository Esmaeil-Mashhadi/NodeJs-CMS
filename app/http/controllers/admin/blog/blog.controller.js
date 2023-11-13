const { createBlogSchema } = require("../../../validator/admin/blogs.schema");
const path = require('path')
const Controller = require("../../controller");
const { BlogModel } = require("../../../../models/blog");
const createHttpError = require("http-errors");
const {StatusCodes}= require("http-status-codes");
const { checkBlogExistence } = require("../../../../utils/functions/dataBaseFunctions");
const { deleteFileInPublic, objectCopy, deleteInvalidData } = require("../../../../utils/functions/utilityFunctions");

class BlogController extends Controller{
    async createBlog(req, res ,next){
        try {
            const result = await createBlogSchema.validateAsync(req.body)
            const {title , text , short_text , category , tags} = result
            req.body.image =path.join(result.fileUploadPath , result.filename)
            req.body.image = req.body.image.replace(/\\/g , '/')
            const author = req.user._id

            const image = req.body.image
            
            const blog = await BlogModel.create({
                title  , image , text , short_text , tags ,category ,author
            })


            if(!blog){
                throw createHttpError.InternalServerError("failed to  create a blog")
            }
            return res.status(StatusCodes.CREATED).json({
                statusCod : StatusCodes.CREATED,
                statusCod:StatusCodes.OK,
                data:{
                    message:"blog created  successfully"

                }
            })
               
        } catch (error) {
            deleteFileInPublic(req.body.image)
            next(error)
        }
    }

    async getListofBlogs(req , res ,next){
        try {
   
            const blogs = await BlogModel.aggregate([
                {$match : {}},

                { $lookup : {
                    from : "users",
                    localField : "author",
                    foreignField : "_id",
                    as : "author"
                }},
                {$unwind : "$author"} ,


                {
                    $lookup :{
                        from :'categories',
                        localField:"category",
                        foreignField:"_id",
                        as: "category"
                    }, 
                },

                {  $unwind : "$category"},

                
                {
                    $project : {
                        "author.__v" :0,
                        "category.__v" :0,
                        "author.otp" : 0,
                        "author.Roles" : 0,
                        "author.discount" : 0,
                        "author.bills" : 0,
                    }
                }
            ])

        
             res.status(StatusCodes.OK).json({
                 statusCode:StatusCodes.OK,
                data:{
                    blogs
                }
             })
            
        } catch (error) {
            next(error)
        }
    }

    async getOneBlogById(req ,res ,next){
        try {
            const {id} = req.params
            const blog = await checkBlogExistence(id)
           return res.status(StatusCodes.OK).json({
               statusCod:StatusCodes.OK , 
            data : {
                blog
            }
           })

            
        } catch (error) {
            next(error)
        }
    }

    async deleteBlog(req, res , next){
        try {
            const {id} = req.params
            await checkBlogExistence(id)
           const result = await BlogModel.deleteOne({_id:id})
           if(result.deletedCount == 0){
            throw createHttpError[400]("failed to delete the blog")
           }
           res.status(StatusCodes.OK).json({
            message:"deleted blog successfully"
           })

        } catch (error) {
            next(error)
        }
    }

    async editBlog(req,  res , next){
        try {
            const {id} = req.params
            const data = req.body


            const blog =  await checkBlogExistence(id)
            if(req?.body.fileUploadPath && req?.body.filename){
                req.body.image = path.join(req.body.fileUploadPath , req.body.filename)
                req.body.image = req.body.image.replace(/\\/g, "/")
            }

            let blackListData = ["bookmark" , 'likes' , "deslike" , "comments" , "author" ]

            deleteInvalidData(data , blackListData)


            const blogData = objectCopy(blog)

            const result = await BlogModel.updateOne({_id: id} ,{$set :{...blogData , ...data}})
            if(result.modifiedCount == 0){
                throw createHttpError.InternalServerError("failed to update the blog")
            }
            return  res.status(StatusCodes.OK).json({
                statusCod:StatusCodes.OK  , 

                data:{
                    mesage:"updated successfully"
                }
                
            })
            
        } catch (error) {
            deleteFileInPublic(req?.body.image)
            next(error)
        }
    }


}



module.exports ={
    AdminBlogController : new BlogController()
}
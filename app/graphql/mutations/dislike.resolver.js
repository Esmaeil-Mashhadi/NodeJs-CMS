const { GraphQLString } = require("graphql")
const { ResponseType } = require("../typeDefs/public.type")
const { verifyAccessTokenInGraphql } = require("../../http/middlewares/verifyAccessToken")
const { productModel } = require("../../models/product")
const { StatusCodes } = require("http-status-codes")
const { findProductById, checkCourseExistence, checkBlogExistence } = require("../../utils/functions/dataBaseFunctions")
const { CourseModel } = require("../../models/course")
const { BlogModel } = require("../../models/blog")

const disLikeResolverForProduct = {
    type:ResponseType,
    args:{
        productID : {type: GraphQLString}
    },

    resolve : async(_ , args , context)=>{
        const {req} = context 
        const user = await verifyAccessTokenInGraphql(req)
        const {productID} = args

        await findProductById(productID)


        let likedProduct = await productModel.findOne({
            $and:[{_id : productID} , {likes :user._id}]
        })
        let dislikedProduct = await productModel.findOne({
            $and:[{_id: productID} ,{dislikes:user._id}]
        })
        
        
        if(likedProduct){
         await productModel.updateOne({_id : productID} , {$pull:{likes : user._id}})}
  
        if(dislikedProduct){
           const result = await productModel.updateOne({_id:productID} , {$pull:{dislikes : user._id}})
            if(result.modifiedCount) {
                return {
                    statusCode : StatusCodes.OK,
                    data:{
                        message: "dislike has gotten back"
                    }
                }
            }
        }

        
        const updateResult = await productModel.updateOne({_id:productID} , {$push :{dislikes : user._id}})
        if(updateResult.modifiedCount){
            return{
                statusCode : StatusCodes.OK,
                data: {
                    message: "product disliked"
                }
            }
        } 
        return {
            statusCode:StatusCodes.INTERNAL_SERVER_ERROR ,
            data :{
                message:"internal server Error "
            }
        }


}}
const disLikeResolverForCourse = {
    type:ResponseType,
    args:{
        courseID : {type: GraphQLString}
    },

    resolve : async(_ , args , context)=>{
        const {req} = context 
        const user = await verifyAccessTokenInGraphql(req)
        const {courseID} = args

        await checkCourseExistence(courseID)

        let likedCourse = await CourseModel.findOne({
            $and:[{_id : courseID} , {likes :user._id}]
        })
        let dislikedCourse = await CourseModel.findOne({
            $and:[{_id: courseID} ,{dislikes:user._id}]
        })
        
        
        if(likedCourse){
         await CourseModel.updateOne({_id : courseID} , {$pull:{likes : user._id}})}
  
        if(dislikedCourse){
           const result = await CourseModel.updateOne({_id:courseID} , {$pull:{dislikes : user._id}})
            if(result.modifiedCount) {
                return {
                    statusCode : StatusCodes.OK,
                    data:{
                        message: "dislike has gotten back"
                    }
                }
            }
        }

        
        const updateResult = await CourseModel.updateOne({_id:courseID} , {$push :{dislikes : user._id}})
        if(updateResult.modifiedCount){
            return{
                statusCode : StatusCodes.OK,
                data: {
                    message: "Course disliked"
                }
            }
        } 
        return {
            statusCode:StatusCodes.INTERNAL_SERVER_ERROR ,
            data :{
                message:"internal server Error "
            }
        }


}}


const disLikeResolverForBlog = {
    type:ResponseType,
    args:{
        blogID : {type: GraphQLString}
    },

    resolve : async(_ , args , context)=>{
        const {req} = context 
        const user = await verifyAccessTokenInGraphql(req)
        const {blogID} = args

        await checkBlogExistence(blogID)

        let likedBlog = await BlogModel.findOne({
            $and:[{_id : blogID} , {likes :user._id}]
        })
        let dislikedBlog = await BlogModel.findOne({
            $and:[{_id: blogID} ,{dislikes:user._id}]
        })
        
        
        if(likedBlog){
         await BlogModel.updateOne({_id : blogID} , {$pull:{likes : user._id}})}
  
        if(dislikedBlog){
           const result = await BlogModel.updateOne({_id:blogID} , {$pull:{dislikes : user._id}})
            if(result.modifiedCount) {
                return {
                    statusCode : StatusCodes.OK,
                    data:{
                        message: "dislike has gotten back"
                    }
                }
            }
        }

        
        const updateResult = await BlogModel.updateOne({_id:blogID} , {$push :{dislikes : user._id}})
        if(updateResult.modifiedCount){
            return{
                statusCode : StatusCodes.OK,
                data: {
                    message: "Blog disliked"
                }
            }
        } 
        return {
            statusCode:StatusCodes.INTERNAL_SERVER_ERROR ,
            data :{
                message:"internal server Error "
            }
        }


}}




module.exports ={
    disLikeResolverForProduct,
    disLikeResolverForCourse,
    disLikeResolverForBlog
}

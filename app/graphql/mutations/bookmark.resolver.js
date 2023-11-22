const { GraphQLString } = require("graphql");
const { verifyAccessTokenInGraphql } = require("../../http/middlewares/verifyAccessToken");
const { BlogModel } = require("../../models/blog");
const { productModel } = require("../../models/product");
const { findProductById, checkBlogExistence, checkCourseExistence } = require("../../utils/functions/dataBaseFunctions");
const { ResponseType } = require("../typeDefs/public.type");
const { StatusCodes } = require("http-status-codes");
const { CourseModel } = require("../../models/course");



const bookmarkResolverForProduct = {
 type : ResponseType,
 args: {
    productID : {type: GraphQLString}
 },

 resolve : async(_ , args , context)=>{
    const {req} = context
    const {productID} = args
    const user = await verifyAccessTokenInGraphql(req)
    await findProductById(productID)

    let bookmarkedProduct= await productModel.findOne({
        $and:[{_id:productID} , {bookmarks : user._id}]
    })


    if(bookmarkedProduct){
        const result = await productModel.updateOne({_id:productID} , {$pull: {bookmarks : user._id}})
        if(result.modifiedCount){
            return{
                statusCode : StatusCodes.OK,
                data: {
                    message:"product unbookmarked successfully"
                }
            }
        }
    }

    const updateResult = await productModel.updateOne({_id : productID} , {$push:{bookmarks : user._id}})
    if(updateResult.modifiedCount){
        return{
            statusCode : StatusCodes.CREATED ,
            data: {
                message:"bookmark added successfully"
            }
        }
    }
    return{
        statusCode:StatusCodes.INTERNAL_SERVER_ERROR , 
        data: {
            message: " failed to bookmark product"
        }
    }
    

 }
}


const bookmarkResolverForBlogs = {
 type : ResponseType,
 args: {
    blogId : {type: GraphQLString}
 },

 resolve : async(_ , args , context)=>{
    const {req} = context
    const {blogId} = args
    const user = await verifyAccessTokenInGraphql(req)
    await checkBlogExistence(blogId)

    let bookmarkedBlog = await BlogModel.findOne({
        $and:[{_id:blogId} , {bookmarks : user._id}]
    })


    if(bookmarkedBlog){
        const result = await BlogModel.updateOne({_id:blogId} , {$pull: {bookmarks : user._id}})
        if(result.modifiedCount){
            return{
                statusCode : StatusCodes.OK,
                data: {
                    message:"blog unbookmarked successfully"
                }
            }
        }
    }

    const updateResult = await BlogModel.updateOne({_id : blogId} , {$push:{bookmarks : user._id}})
    if(updateResult.modifiedCount){
        return{
            statusCode : StatusCodes.CREATED ,
            data: {
                message:"blog bookmarked successfully"
            }
        }
    }
    return{
        statusCode:StatusCodes.INTERNAL_SERVER_ERROR , 
        data: {
            message: " failed to bookmark blog"
        }
    }
    

 }
}


const bookmarkResolverForCourses = {
 type : ResponseType,
 args: {
    courseID : {type: GraphQLString}
 },

 resolve : async(_ , args , context)=>{
    const {req} = context
    const {courseID} = args
    const user = await verifyAccessTokenInGraphql(req)
    await checkCourseExistence(courseID)

    let bookmarkedCourse = await CourseModel.findOne({
        $and:[{_id:courseID} , {bookmarks : String(user._id)}]
    })


    if(bookmarkedCourse){
        const result = await CourseModel.updateOne({_id:courseID} , {$pull: {bookmarks : user._id}})
        if(result.modifiedCount){
            return{
                statusCode : StatusCodes.OK,
                data: {
                    message:"course unbookmarked successfully"
                }
            }
        }
    }

    const updateResult = await CourseModel.updateOne({_id : courseID} , {$push:{bookmarks : user._id}})
    if(updateResult.modifiedCount){
        return{
            statusCode : StatusCodes.CREATED ,
            data: {
                message:"course bookmark added successfully"
            }
        }
    }
    return{
        statusCode:StatusCodes.INTERNAL_SERVER_ERROR , 
        data: {
            message: " failed to bookmark product"
        }
    }
    

 }
}



module.exports = {
    bookmarkResolverForProduct ,
    bookmarkResolverForBlogs,
    bookmarkResolverForCourses

}
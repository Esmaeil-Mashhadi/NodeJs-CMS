const { GraphQLString } = require("graphql");
const { ResponseType } = require("../typeDefs/public.type");
const { verifyAccessTokenInGraphql } = require("../../http/middlewares/verifyAccessToken");
const { productModel } = require("../../models/product");
const { StatusCodes } = require("http-status-codes");
const { CourseModel } = require("../../models/course");
const { BlogModel } = require("../../models/blog");
const { checkBlogExistence, checkCourseExistence, findProductById } = require("../../utils/functions/dataBaseFunctions");

const likeResolverForProduct = {
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
         const result =  await productModel.updateOne({_id : productID} , {$pull:{likes : user._id}})
         if(result.modifiedCount) return {
            statusCode: StatusCodes.OK,
            data : {
                message:"like have gotten back"
            }
         }
        }
        if(dislikedProduct){
            await productModel.updateOne({_id:productID} , {$pull:{dislikes : user._id}})
        }

        await productModel.updateOne({_id:productID} , {$push :{likes : user._id}})
        return{
            statusCode : StatusCodes.OK,
            data: {
                message:"product liked"
            }
        }
    }


}

const likeResolverForCourse = {
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
         const result =  await CourseModel.updateOne({_id : courseID} , {$pull:{likes : user._id}})
         if(result.modifiedCount) return {
            statusCode: StatusCodes.OK,
            data : {
                message:"like have gotten back"
            }
         }
        }
        if(dislikedCourse){
            await CourseModel.updateOne({_id:courseID} , {$pull:{dislikes : user._id}})
        }

        await CourseModel.updateOne({_id:courseID} , {$push :{likes : user._id}})
        return{
            statusCode : StatusCodes.OK,
            data: {
                message:"course liked"
            }
        }
    }


}
const likeResolverForBlog = {
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
         const result =  await BlogModel.updateOne({_id : blogID} , {$pull:{likes : user._id}})
         if(result.modifiedCount) return {
            statusCode: StatusCodes.OK,
            data : {
                message:"like have gotten back"
            }
         }
        }
        if(dislikedBlog){
            await BlogModel.updateOne({_id:blogID} , {$pull:{dislikes : user._id}})
        }

        await BlogModel.updateOne({_id:blogID} , {$push :{likes : user._id}})
        return{
            statusCode : StatusCodes.OK,
            data: {
                message:"blog liked"
            }
        }
    }


}


module.exports = {
    likeResolverForBlog,
    likeResolverForCourse,
    likeResolverForProduct
}
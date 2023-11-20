const { GraphQLString } = require("graphql");
const { checkBlogExistence, getComments, checkCourseExistence, findProductById } = require("../../utils/functions/dataBaseFunctions");
const { BlogModel } = require("../../models/blog");
const { verifyAccessTokenInGraphql, verifyAccessToken } = require("../../http/middlewares/verifyAccessToken");
const { StatusCodes } = require("http-status-codes");
const { ResponseType } = require("../typeDefs/public.type");
const { CommentType } = require("../typeDefs/comment.type");
const createHttpError = require("http-errors");
const { default: mongoose } = require("mongoose");
const { CourseModel } = require("../../models/course");
const { productModel } = require("../../models/product");

const CommentResolverForBlog = {
   type: ResponseType,
   args : {
    comment : {type: GraphQLString},
    blogID : {type: GraphQLString},
    parent :{type : GraphQLString}

   },
   resolve : async(_, args , context)=>{
        const {req , res } = context
        const user =  await verifyAccessTokenInGraphql(req, res)
        const {comment , blogID , parent} = args
          if(!mongoose.isValidObjectId(blogID)) throw createHttpError.BadRequest("id field is not valid")


        if(parent && mongoose.isValidObjectId(parent)){

            const commentDocument = await getComments(parent , BlogModel)
            if(!commentDocument?.openToComment) throw createHttpError.Forbidden("you cant set reply on this comment")
             const replyResult = await BlogModel.updateOne({_id : blogID,'comments._id': parent} , {$push :{"comments.$.replies":{
               comment , user : user._id , show:false , openToComment :false
                 }}})

            if (replyResult.modifiedCount == 0) throw createHttpError.InternalServerError("failed to add reply")

            return {
                statusCode: StatusCodes.CREATED,
                data : {
                    message : "reply added successfully"
            }
                }
        
        }else{
            await checkBlogExistence(blogID)
            await BlogModel.updateOne({_id : blogID} , {$push : 
            {"comments" : {comment , user : user._id , openToComment : true }}})
            return{
                statusCode : StatusCodes.CREATED, 
                data: { 
                    message:"comment added successfully"
                }
            }

        }

   }    
}


const CommentResolverForCourse = {
    type : ResponseType, 
    args : {
        comment : {type: GraphQLString},
        courseID : {type: GraphQLString},
        parent :{type : GraphQLString}
    },
    resolve : async(_, args , context)=>{
        const {req} = context
        const user = await verifyAccessTokenInGraphql(req)
        const {comment , courseID , parent}  = args

       
        if(!mongoose.isValidObjectId(courseID)) throw createHttpError.BadGateway("invalid id")
        await checkCourseExistence(courseID)

        if(parent && mongoose.isValidObjectId(parent)){
           const commentDocument =  await getComments(parent , CourseModel)

           if(!commentDocument?.openToComment) throw createHttpError.Forbidden("cant set reply to this comment")
           const replyResult = await CourseModel.updateOne({_id : courseID ,'comments._id': parent} , {$push :{'comments.$.replies' : {
                comment , user: user._id , openToComment:false , show :false
            }}})
            if(!replyResult.modifiedCount) throw createHttpError.InternalServerError("failed to add reply")
            return {
                statusCode:StatusCodes.CREATED,
                data: { 
                    message: "reply added successfully"
                }
            
                }
        }else{
             await CourseModel.updateOne({_id: courseID } , {$push :{'comments' : {
                comment , user:user._id , openToComment:true , show:false , 
            }}})
        }
        return {
            statuscode:StatusCodes.CREATED,
            data : {
                message : 'comment added successfully'
            }
        } 


    }
}


const CommentResolverForProduct = {
    type : ResponseType, 
    args : {
        comment : {type: GraphQLString},
        productID : {type: GraphQLString},
        parent :{type : GraphQLString}
    },
    resolve : async(_, args , context)=>{
        const {req} = context
        const user = await verifyAccessTokenInGraphql(req)
        const {comment , productID , parent}  = args

        if(!mongoose.isValidObjectId(productID)) throw createHttpError.BadGateway("invalid id")
        await findProductById(productID)

    
    if(parent && mongoose.isValidObjectId(parent)){
        
        const commentDocument =  await getComments(parent , productModel)
      
       
           if(!commentDocument?.openToComment) throw createHttpError.Forbidden("cant set reply to this comment")
           const replyResult = await productModel.updateOne({_id : productID ,'comments._id': parent} , {$push :{'comments.$.replies' : {
                comment , user: user._id , openToComment:false , show :false
            }}})

            if(!replyResult.modifiedCount) throw createHttpError.InternalServerError("failed to add reply")
            return {
                statusCode:StatusCodes.CREATED,
                data: { 
                    message: "reply added successfully"
                }
            
                }
        }else{
             await productModel.updateOne({_id: productID } , {$push :{'comments' : {
                comment , user:user._id , openToComment:true , show:false , 
            }}})
        }
        return {
            statuscode:StatusCodes.CREATED,
            data : {
                message : 'comment added successfully'
            }
        } 


    }
}






module.exports = {
    CommentResolverForBlog,
    CommentResolverForCourse,
    CommentResolverForProduct
}
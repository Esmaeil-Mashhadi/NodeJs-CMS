const { GraphQLString, GraphQLInt } = require("graphql");
const { ResponseType } = require("../typeDefs/public.type");
const { StatusCodes } = require("http-status-codes");

const { verifyAccessTokenInGraphql } = require("../../http/middlewares/verifyAccessToken");
const { findProductById, checkCourseExistence, getOrdersInBasket } = require("../../utils/functions/dataBaseFunctions");
const { userModel } = require("../../models/user");
const createHttpError = require("http-errors");

const AddProductToBasketResolver = {
    type: ResponseType,
    args : {
        productID : {type:GraphQLString},
    },
    resolve : async(_ , args , context)=>{
        const {req} = context
        const {productID} = args
        const user = await verifyAccessTokenInGraphql(req)
        await findProductById(productID)
        const product = await getOrdersInBasket(user._id , productID , _)
    
        if(product){
           const incrementResult = await userModel.updateOne({'basket.products.productID': productID} , {
                $inc:{
                    'basket.products.$.count' : 1
                }
            } )

            if (incrementResult.modifiedCount){
                return {
                    statusCode : StatusCodes.OK,
                    data:{
                        message:"product quantity increased"
                    }
                }
            }else{
                return{
                    statusCode : StatusCodes.INTERNAL_SERVER_ERROR,
                    data:{
                        message:"faild to increase quantity"
                    }
                }
            }
        }


         const result = await userModel.updateOne({_id:user._id} , {
                $push: {'basket.products': {productID}}  ,
            }, {upsert:true})

        if(result.modifiedCount){
            return {
                statusCode:StatusCodes.OK,
                data:{
                    message:"producted added to cart successfully"
                }
            }
            
        }else{
            return{
                statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
                data:{
                    message:"failed to add product to the cart"
                }
            }
        }
        

    }
}
const AddCourseToBasketResolver = {
    type: ResponseType,
    args : {
        courseID : {type:GraphQLString},
    },
    resolve : async(_ , args , context)=>{
        const {req} = context
        const {courseID} = args
        const user = await verifyAccessTokenInGraphql(req)

        await checkCourseExistence(courseID)
        const course = await getOrdersInBasket(user._id , _ , courseID)

        if(course){
            throw createHttpError.BadRequest("you already have this course")
        }


         const result = await userModel.updateOne({_id:user._id} , {
                $push: {'basket.courses': {courseID}}  ,
            }, {upsert:true})

        if(result.modifiedCount){
            return {
                statusCode:StatusCodes.OK,
                data:{
                    message:"course added to cart successfully"
                }
            }
            
        }else{
            return{
                statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
                data:{
                    message:"failed to add course to  cart"
                }
            }
        }
        

    }
}


const removeProductFromBasketResolver = {
    type: ResponseType,
    args : {
        productID : {type: GraphQLString},

    },
    resolve : async(_ , args , context)=>{
        const {req} = context
        const {productID} = args
        const user = await verifyAccessTokenInGraphql(req)
        await findProductById(productID)
        const product = await getOrdersInBasket(user._id , productID , _)
        if(product.count > 1){
           const countResult = await userModel.updateOne({'basket.products.productID' : productID} , {
                $inc : {
                    'basket.products.$.count' : -1
                }
            })
            if(countResult.modifiedCount){
                return{
                    statusCode:StatusCodes.OK,
                    data:{
                        message:"product quantity decreased"
                    }
                }
            }else{
                return{
                    statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
                    data:{
                        message:"failed to decrease product quantity"
                    }
                }
            }

        }else{
           const result = await userModel.updateOne({'basket.products.productID' : productID} ,{
                $pull :{'basket.products' : {productID}}
            })
            if(result.modifiedCount){
                return{
                    statusCode:StatusCodes.OK,
                    data:{
                        message:"product removed successfully"
                    }
                }
            }
        }

        return{
            statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
            data:{
                message:"something went wrong!"
            }
        }



    }
}


const removeCourseFromBasketResolver = {
    type: ResponseType,
    args : {
        courseID : {type: GraphQLString},

    },
    resolve : async(_ , args , context)=>{
        const {req} = context
        const {courseID} = args
        const user = await verifyAccessTokenInGraphql(req)
        await checkCourseExistence(courseID)
        const course = await getOrdersInBasket(user._id , _, courseID)
        if(course.count > 1){
            console.log('hi');
           const countResult = await userModel.updateOne({'basket.courses.courseID' : courseID} , {
                $inc : {
                    'basket.courses.$.count' : -1
                }
            })
            if(countResult.modifiedCount){
                return{
                    statusCode:StatusCodes.OK,
                    data:{
                        message:"course quantity decreased"
                    }
                }
            }else{
                return{
                    statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
                    data:{
                        message:"failed to decrease course quantity"
                    }
                }
            }

        }else{
           const result = await userModel.updateOne( {$and:[{_id:user._id} ,{'basket.courses.courseID' : courseID}]} ,{
                $pull :{'basket.courses' : {courseID}}
            })
            console.log(result);
            if(result.modifiedCount){
                return{
                    statusCode:StatusCodes.OK,
                    data:{
                        message:"course removed successfully"
                    }
                }
            }
        }

        return{
            statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
            data:{
                message:"something went wrong!"
            }
        }



    }
}









module.exports = {
    AddProductToBasketResolver,
    AddCourseToBasketResolver,
    removeProductFromBasketResolver,
    removeCourseFromBasketResolver
}
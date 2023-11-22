const { GraphQLList, GraphQLString } = require("graphql");
const { blogType } = require("../typeDefs/blog.type");
const { BlogModel } = require("../../models/blog");
const { verifyAccessTokenInGraphql } = require("../../http/middlewares/verifyAccessToken");
const { productModel } = require("../../models/product");
const { CourseModel } = require("../../models/course");
const { CourseType } = require("../typeDefs/course.type");
const { productType } = require("../typeDefs/product.type");
const { AnyType, userType } = require("../typeDefs/public.type");
const { userModel } = require("../../models/user");
const { getUserBasket } = require("../../utils/functions/dataBaseFunctions");

const getBlogsBookmarks = {
    type : new GraphQLList(blogType),

    resolve : async(_ , args , context)=>{
        const {req} = context
        const user = await verifyAccessTokenInGraphql(req)
       
        const blogs = await BlogModel.find({'bookmarks' : user._id}).populate([{path:'category'},{path: 'author'},
         {path:"comments.user"} , {path:"comments.replies.user"} , {path:"likes"} , {path:"dislikes"},
          {path: "bookmarks"}])
          
        return blogs
    }
}
const getCoursesBookmarks ={
    type : new GraphQLList(CourseType),

    resolve : async(_ , args , context)=>{
        const {req} = context
        const user = await verifyAccessTokenInGraphql(req)
        const courses = await CourseModel.find({'bookmarks' : user._id}).populate([{path:'category'} , {path:"teacher"} 
        , {path:"comments.user"} , {path:"comments.replies.user"} , {path:"likes"} , {path:"dislikes"},
          {path: "bookmarks"}]) 
        return courses
    }
}
const getProductsBookmarks ={
    type : new GraphQLList(productType),

    resolve : async(_ , args , context)=>{
        const {req} = context
        const user = await verifyAccessTokenInGraphql(req)
        const products = await productModel.find({'bookmarks' : user._id}).populate([{path:'category'} ,  {path:"supplier"} 
        , {path:"comments.user"} , {path:"comments.replies.user"} , {path:"likes"} , {path:"dislikes"},
          {path: "bookmarks"}])
        return products
    }
}


const getUserOrders = {
    type : AnyType,
    resolve: async(_ , args , context)=>{
        const {req} = context
        const user = await verifyAccessTokenInGraphql(req)
        const userDetail  = await getUserBasket(user)
        return userDetail
    }
}



module.exports = {
    getBlogsBookmarks,
    getCoursesBookmarks,
    getProductsBookmarks,
    getUserOrders

}
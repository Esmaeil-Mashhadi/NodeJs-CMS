const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const {blogResolver} = require('./query/blog.resolver');
const { productResolver } = require("./query/product.resolver");
const { categoryResolver, categoryChildResolver } = require("./query/category.resolver");
const { courseResolver } = require("./query/course.resolver");
const { CommentResolverForBlog, CommentResolverForCourse, CommentResolverForProduct } = require("./mutations/comment.resolver");
const { likeResolverForProduct, likeResolverForCourse, likeResolverForBlog } = require("./mutations/like.resolver");
const { disLikeResolverForProduct, disLikeResolverForCourse, disLikeResolverForBlog } = require("./mutations/dislike.resolver");

const RootQuery = new GraphQLObjectType({
    name:"RootQuery", 
    fields:{
       blogs : blogResolver, 
       products : productResolver,
       categories: categoryResolver,
       categoryChilds :categoryChildResolver,
       courses: courseResolver
    }
})
const RootMutation = new GraphQLObjectType({
    name:"RootMutation", 
    fields : {
        AddCommentForBlog : CommentResolverForBlog,
        AddCommentForCourse: CommentResolverForCourse,
        addCommentForProduct:CommentResolverForProduct,
        likeProduct : likeResolverForProduct,
        dislikeProcut : disLikeResolverForProduct,
        likeCourse: likeResolverForCourse,
        dislikeCourse : disLikeResolverForCourse,
        likeBlog: likeResolverForBlog,
        dislikeBlog: disLikeResolverForBlog

    }
})


const graphqlSchema = new GraphQLSchema({
    query:RootQuery , 
    mutation: RootMutation
})

module.exports ={
    graphqlSchema
}


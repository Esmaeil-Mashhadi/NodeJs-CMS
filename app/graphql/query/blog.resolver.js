const { GraphQLList, GraphQLString } = require("graphql");
const { blogType } = require("../typeDefs/blog.type");
const { BlogModel } = require("../../models/blog");

const blogResolver = {
    type: new GraphQLList(blogType),
    args : {
        category : {type : GraphQLString}
    }, 
    resolve: async(_, args)=>{
           const {category} = args
           const findQuery = category ? {category} : {}
          return await BlogModel.find(findQuery)
          .populate([{path: 'author'},  {path : "category"} , {path:'comments.user'},{path:"comments.replies.user"} , , {path:"likes"} , {path:"dislikes"} , {path:'bookmarks'} ])
    }
}



module.exports = {
    blogResolver
}
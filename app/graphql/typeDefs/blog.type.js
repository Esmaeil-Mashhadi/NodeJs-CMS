const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { userType, CategorySubType } = require("./public.type");
const { CommentType } = require("./comment.type");

const blogType = new GraphQLObjectType({
    name :"blogType" , 
    fields:{
        _id:{type : GraphQLString} ,
        author :{type : userType},
        title :{type: GraphQLString},
        short_text:{type:GraphQLString },
        text:{type:GraphQLString },
        image:{type:GraphQLString},
        tags:{type: new GraphQLList(GraphQLString)},
        category : {type : CategorySubType},
        comments:{type:new GraphQLList(CommentType)},
        likes : {type: new GraphQLList(userType)},
        dislikes : {type: new GraphQLList(userType)}
    }
})



module.exports = {
    blogType
}






const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLList } = require("graphql");
const { userType, AnyType } = require("./public.type");

const replyCommentType = new GraphQLObjectType({ 
    name:"replyCommentType",
    fields: {
        user : {type:userType},
        comment : {type: GraphQLString},
        show : {type: GraphQLBoolean },
        createdAt :{type: GraphQLString}
    }
})
const CommentType = new GraphQLObjectType({ 
    name:"CommentType",
    fields: {
        user : {type:userType},
        comment : {type: GraphQLString},
        replies: {type : new GraphQLList(replyCommentType) },
        show : {type: GraphQLBoolean },
        openToComment : {type: GraphQLBoolean },
        createdAt :{type: GraphQLString}
    }
})



module.exports = {
    CommentType ,
    
}
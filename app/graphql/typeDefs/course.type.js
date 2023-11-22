const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, graphql } = require("graphql");
const { userType, CategorySubType } = require("./public.type");
const { CommentType } = require("./comment.type");


const episodesType = new GraphQLObjectType({
    name:"episodesType",
    fields:{ 
        title :{type: GraphQLString},
        text:{type:GraphQLString },
        type : {type : GraphQLString},
        time : {type : GraphQLString},
        videoAddress : {type : GraphQLString},
        videoUrl : {type: GraphQLString}
    }
})

const chapterType = new GraphQLObjectType({
    name:"chapterType", 
    fields:{
        _id:{type : GraphQLString} ,
        title :{type: GraphQLString},
        text:{type:GraphQLString },
        episodes: {type: new GraphQLList(episodesType)}
    }
})

const CourseType  = new GraphQLObjectType({
    name:"CourseType",
    fields: {
        _id:{type : GraphQLString} ,
        teacher :{type : userType},
        title :{type: GraphQLString},
        short_text:{type:GraphQLString },
        text:{type:GraphQLString },
        image:{type: GraphQLString},
        imageURL:{type: GraphQLString},
        tags:{type: new GraphQLList(GraphQLString)},
        category : {type : CategorySubType},
        price : {type : GraphQLInt},
        discount : {type : GraphQLInt},
        type : {type : GraphQLString},
        status : {type : GraphQLString},
        chapters : {type: new GraphQLList(chapterType)},
        comments : {type: new GraphQLList(CommentType)},
        likes : {type: new GraphQLList(userType)},
        dislikes : {type: new GraphQLList(userType)},
        bookmarks: {type : new GraphQLList(userType)}

    }
})       


module.exports = {
    CourseType
}
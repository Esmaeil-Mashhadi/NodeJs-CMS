const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");
const { CategorySubType, userType } = require("./public.type");
const { CommentType } = require("./comment.type");

const FeaturesType = new  GraphQLObjectType({
    name:"FeaturesType", 
    fields: {
        length : {type:GraphQLString},
        height :{type:GraphQLString},
        width : {type:GraphQLString},
        weight : {type:GraphQLString},
        colors : {type: new GraphQLList(GraphQLString)},
    }
})

const productType = new GraphQLObjectType({
    name:"productType", 
    fields : {
        _id:{type : GraphQLString} ,
        supplier :{type : userType},
        title :{type: GraphQLString},
        short_text:{type:GraphQLString },
        text:{type:GraphQLString },
        images:{type: new GraphQLList(GraphQLString)},
        tags:{type: new GraphQLList(GraphQLString)},
        category : {type : CategorySubType},
        price : {type : GraphQLInt},
        discount : {type : GraphQLInt},
        count : {type : GraphQLInt},
        type : {type : GraphQLString},
        features: {type:FeaturesType},
        comments: {type:new GraphQLList(CommentType)},
        likes : {type: new GraphQLList(userType)},
        dislikes : {type: new GraphQLList(userType)}

        
    }
})



module.exports = { 
    productType
}
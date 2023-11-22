const { GraphQLObjectType, GraphQLString, GraphQLScalarType, Kind, GraphQLList } = require("graphql");
const { toObject, parseLiteral } = require("../utils");


const AnyType = new GraphQLScalarType({
    name:"anyType",
    parseValue: toObject,
    serialize: toObject,
    parseLiteral: parseLiteral,
    
})

const userType = new GraphQLObjectType({
    name:"userType", 
    fields: {
        _id :{type : GraphQLString} ,
        first_name: {type: GraphQLString},
        last_name: {type: GraphQLString},
        mobile: {type: GraphQLString},
        role: {type:GraphQLString},
        basket : {type: AnyType}
    }
})


const CategorySubType = new GraphQLObjectType({
    name:"CategorySubType" , 
    fields:{
        _id: {type: GraphQLString},
        title : {type : GraphQLString},
    }
})

const ResponseType = new GraphQLObjectType({
    name:"ResponseType",
    fields : {
        statusCode : {type: GraphQLString},
        data : {type: AnyType}
    }
})



module.exports ={
    userType , 
    CategorySubType,
    AnyType , 
    ResponseType
}
const { GraphQLList, GraphQLString } = require("graphql");
const { CourseModel } = require("../../models/course");
const { CourseType } = require("../typeDefs/course.type");

const courseResolver = {
    type : new GraphQLList(CourseType),
    args : {
        category : {type : GraphQLString}
    },
    resolve : async(_, args)=>{
        const {category} = args
        const findQuery = category ? {category} : {}
        return await CourseModel.find(findQuery).populate([
            {path:'category'}, {path:'teacher'}, {path:"likes"} , {path:"dislikes"},
            {path:"bookmarks"}])
    }
}




module.exports = {
    courseResolver
}
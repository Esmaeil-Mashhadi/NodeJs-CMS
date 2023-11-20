const { GraphQLList, GraphQLString } = require("graphql");
const { categoryModel } = require("../../models/categories");
const { CategoryType } = require("../typeDefs/category.type");


const categoryResolver ={
   type: new GraphQLList(CategoryType),
    resolve: async()=>{
       return await categoryModel.find({parent : undefined})
       
    }
}


const categoryChildResolver = {
    type : new GraphQLList(CategoryType),
    args:{
        parent : {type: GraphQLString}
    },

    resolve :async(_, args)=>{
        const {parent} = args
        if(!parent) return {}
        const categories = await categoryModel.find({parent})
        return categories
    }
}


module.exports ={
    categoryResolver,
    categoryChildResolver
}
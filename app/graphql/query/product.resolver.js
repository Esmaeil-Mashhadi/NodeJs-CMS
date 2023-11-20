const { GraphQLList , GraphQLString } = require("graphql");
const { productModel } = require("../../models/product");
const { productType } = require("../typeDefs/product.type");

const productResolver = {
    type: new GraphQLList(productType),
    args:{
        category : {type : GraphQLString}
    },
    resolve : async(_, args)=>{
            const {category} = args
            const findQuery  = category ? {category}  : {}
            return await productModel.find(findQuery).populate([{path:'category'} ,  {path:"supplier"} , {path:"comments.user"} , {path:"comments.replies.user"} , {path:"likes"} , {path:"dislikes"}])
    }
}



module.exports = {
    productResolver
}
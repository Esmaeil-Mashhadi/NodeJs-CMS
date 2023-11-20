const { graphqlSchema } = require("../../graphql/index.qraphql");

function graphqlConfig(req , res){
    return{
        schema: graphqlSchema,
        graphiql : true , 
        context: {req , res}
    }
}




module.exports = {
    graphqlConfig
}
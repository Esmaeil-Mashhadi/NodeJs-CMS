const { Router } = require("express");
const { HomeRoute } = require("./api");
const { UserAuthRoutes } = require("./user/auth");
const {developerRoutes} = require("./developer.routes");
const { AdminRoutes } = require("./admin/admin.routes");
const { verifyAccessToken } = require("../http/middlewares/verifyAccessToken");
const { graphqlHTTP } = require("express-graphql");
const { graphqlConfig } = require("../utils/functions/graphql.config");


const router = Router()
router.use('/' , HomeRoute)
router.use('/user' , UserAuthRoutes)
router.use("/developer" , developerRoutes)
router.use('/admin'  ,verifyAccessToken , AdminRoutes)
router.use('/graphql' , graphqlHTTP(graphqlConfig))

 
module.exports ={
    AllRoutes : router
}
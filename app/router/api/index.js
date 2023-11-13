const { Router } = require("express");
const { Home } = require("../../http/controllers/api/home.controller");
const { verifyAccessToken } = require("../../http/middlewares/verifyAccessToken");
const router = Router()


/**
 * @swagger
 * 
 * tags:
 *  name: IndexPage
 *  description: main page apis
 
 * /:
 *  get:
 *      summary: base routes
 *      tags: [IndexPage]
 *      description: getting all data for index page
 *      parameters:
 *         - in : header
 *           name: accessToken
 *           example: Bearer YourToken...
 *      responses: 
 *          200:
 *             description: success
 *          404: 
 *             description: not Found
 */

router.get("/" , verifyAccessToken ,   Home.indexPage)

module.exports = {
    HomeRoute : router
}


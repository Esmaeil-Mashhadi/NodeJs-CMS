const { authSchema } = require("../../validator/user/auth.schema");
const Controller = require("../controller");
const createError = require('http-errors')

class HomeController extends Controller {
    async indexPage(req, res, next) {
        try { 
           res.status(200).json({message:"welcome to the store project"})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    Home : new HomeController()
}
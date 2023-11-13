const createHttpError = require("http-errors");
const Controller = require("../../controller");
const { AddCategorySchema, updateCategorySchema } = require("../../../validator/admin/category.schema");
const { default: mongoose } = require("mongoose");
const {StatusCodes} =  require("http-status-codes");
const { categoryModel } = require("../../../../models/categories");
const { checkCategoryExistence } = require("../../../../utils/functions/dataBaseFunctions");

class CategoryController extends Controller{
   async addCategory(req ,res , next){
        try {
            await AddCategorySchema.validateAsync(req.body)
            const {title , parent } = req.body;
            const category  = await categoryModel.create({
                title , parent
            })
            if(!category){
                throw createHttpError.InternalServerError("failed to create category")
            }

            return res.status(StatusCodes.CREATED).json({
                data :{
                    statusCode:StatusCodes.CREATED,
                    data:{
                        message:"category added successfully"
                    }
                }
            })
        } catch (error) {
            next(error)
        }
    }


  async removeCategory(req ,res , next){
          try {
                const {id} = req.params
                const category = await checkCategoryExistence(id)
                const deleteResult = await categoryModel.deleteMany({
                    $or :[
                        {_id : category._id},
                        {parent : category._id}
                    ]
                })
                if(deleteResult.deletedCount == 0){
                    throw createHttpError.InternalServerError("failed to delete category")
                } else {
                    return res.status(StatusCodes.OK).json({
                    statusCode:StatusCodes.OK,
                    data:{

                        message:"deleted successfully"
                    }
                })
                }
    
            }  catch (error) {
            next(error)
        }
    }


  async  editCategory(req ,res , next){
        try {
            const {id} = req.params
            const {title} = req.body
             await checkCategoryExistence(id)
             await updateCategorySchema.validateAsync(req.body)
            const updateResult = await categoryModel.updateOne({_id: id} , {$set : {title}})
            if(updateResult.modifiedCount == 0){
                throw createHttpError.InternalServerError("faild to update")
            }

            return res.status(StatusCodes.OK).json({
                data:{
                    statusCode:StatusCodes.OK,
                    data:{
                        message:"updated successfully"
                    }
                }
            })
        } catch (error) {
            next(error)
        }
    }


  async  getAllCategory(req ,res , next){
        try {
    
        const categories = await categoryModel.find({parent : undefined} , {__v :0 , id:0})
        return res.status(StatusCodes.OK).json({
            data:{
                statusCode:StatusCodes.OK,
                data:{
                    categories
                }
            }
        })
        } catch (error) {
            next(error)
        }
    }


    async  getCategoryById(req ,res , next){
        try {
            const {id} = req.params
            const converetedID = new mongoose.Types.ObjectId(id)
            const categories = await categoryModel.aggregate([
                {
                    $match: {_id : converetedID}
                },
                {
                    $lookup:{
                        from:"categories",
                        localField:"_id",
                        foreignField:"parent",
                        as:'children'
                    }
                }
            ])


            res.status(StatusCodes.OK).json({status:StatusCodes.OK , data : categories })
           
        } catch (error) {
            next(error)
            
        }
    }


   async getAllParents(req , res ,next){
  
        try {
            const parents = await categoryModel.find({ parent: undefined });
            return res.status(StatusCodes.OK).json({
                statusCode:StatusCodes.OK,
                data:{
                    parents
                }
            })
            
        } catch (error) {
            next(error)
        }
    }


  async getChildParent(req , res , next){
            try {

                const {parent} = req.params
                const children = await categoryModel.find({parent} , {_v: 0 , parent: 0})

                if(!children){
                    throw createHttpError[404]("there is no children")
                }
                res.status(StatusCodes.OK).json({
                    statusCode:StatusCodes.OK,
                    data:{
                        children
                    }
                })
                
            } catch (error) {

                next(error)
            }
    }


}


module.exports = {
    CategoryController : new CategoryController()
}


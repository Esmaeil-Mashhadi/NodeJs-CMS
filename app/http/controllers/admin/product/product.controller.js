const { productModel } = require("../../../../models/product");
const { productSchema } = require("../../../validator/admin/product.schema");
const Controller = require("../../controller");
const createHttpError = require("http-errors");
const {StatusCodes} = require('http-status-codes');
const { listOfImagesFromRequest, deleteFileInPublic, setFeatures, objectCopy, deleteInvalidData } = require("../../../../utils/functions/utilityFunctions");
const { findProductById } = require("../../../../utils/functions/dataBaseFunctions");
const { isValidObjectId } = require("mongoose");

const ProductBlackList = {
    BOOKMARKS: "bookmarks",
    LIKES: "likes",
    DISLIKES: "dislikes",
    COMMENTS: "comments",
    SUPPLIER: "supplier",
    WEIGHT: "weight",
    WIDTH: "width",
    LENGTH: "length",
    HEIGHT: "height",
    COLORS: "colors"
  }

  Object.freeze(ProductBlackList)

class productController extends Controller{
   async addProduct(req ,res ,next){
        try {   

                const images = listOfImagesFromRequest(req.files || [] , req?.body.fileUploadPath)  

                const productResult = await productSchema.validateAsync(req.body)
                
                const {title  , text , short_text , category , tags  ,type, count , price , discount} = productResult
            
                const supplier = req.user._id

               const features = setFeatures(productResult)
             
                
                const product = await productModel.create({
                    supplier, title , text , type , short_text , category , tags , count , price , discount , features  , images
                })

               
                if(product){
                    res.status(StatusCodes.CREATED).json({
                        statusCode:StatusCodes.CREATED,
                        data:{
                            message:"product created successfully"
                        }
                    })
                } else {
                    throw createHttpError[500]("failed to save product")
                }

        } catch (error) {
            deleteFileInPublic(req.body.image)
            next(error)
        }
    }

    async getAllProducts(req , res , next){

        try {
        
            const {search} = req?.query || ""
            let products ;
            if(search){
                 products = await productModel.find({
                    $text:{
                        $search : search
                    }
                })
            } else{
                products = await productModel.find({})
            }
           
            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    products
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async getProductById(req , res ,next){
        try {
            const {id} = req.params
            await ObjectIdValidator.validateAsync({id})
            
            const product = await findProductById(id)
            return res.status(StatusCodes.OK).json({
                statusCode:StatusCodes.OK,
                data:{

                    product
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async removeProduct(req ,res , next){
        try {
            const {id} = req.params
            if(!isValidObjectId(id)) throw createHttpError.BadRequest('id is not valid')
            await findProductById(id)
            const result = await productModel.deleteOne({_id:id});
            if(result.deletedCount > 0){
                res.status(StatusCodes.OK).json({
                    statusCode:StatusCodes.OK,
                    data:{
                        message:"product deleted successfully"
                    }
                })
            }else{
                 throw createHttpError.InternalServerError("something went wrong , delete unsuccessful")
            }

        } catch (error) {
            next(error)
        }
    }

    async editProduct(req , res , next){
        try {
            const {id} = req.params
            const data = objectCopy(req.body)
             const product = await  findProductById(id)
               data.images = listOfImagesFromRequest(req?.files , req?.body.fileUploadPath)
               data.features = setFeatures(req.body)
               let blackListData = Object.values(ProductBlackList)
               deleteInvalidData(data , blackListData)
                const productData = objectCopy(product)

                
                    const result = await productModel.updateOne({_id: id}, {$set : {...productData , ...data}})
                    if(result.modifiedCount == 0){
                        throw {status: StatusCodes.INTERNAL_SERVER_ERROR , message:"internal server error"}
                    }
                    return res.status(StatusCodes.OK).json({

                        statusCode : StatusCodes.OK , 
                        data:{
                          message:"successfully updated product"  
                        }
                    })

        } catch (error) {
            next(error)
        }
    }


}




module.exports = {
    productController : new productController()
}
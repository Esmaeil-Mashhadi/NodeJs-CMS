const createHttpError = require("http-errors");
const { BlogModel } = require("../../models/blog");
const { CourseModel } = require("../../models/course");
const { default: mongoose } = require("mongoose");
const { roleModel } = require("../../models/role");
const { permissionsModel } = require("../../models/permission");
const { productModel } = require("../../models/product");
const { categoryModel } = require("../../models/categories");
const { objectCopy } = require("./utilityFunctions");
const { userModel } = require("../../models/user");


async function checkCategoryExistence(id){
    const category =  await categoryModel.findById(id)
    if(!category){
        throw createHttpError.NotFound("couldn't find the category")
    }
    return category
  }

async function checkBlogExistence(id){
 const blog = await BlogModel.findById(id).populate([{path:"category" , select: "-children"} , {path:'author' , select :['mobile' ,'first_name' , 'last_name']}])
 if(!blog){
    throw createHttpError.NotFound("blog doesn't exist")
 }
 return blog
}
async function findProductById(productID){
    const product = await productModel.findById(productID)
    if(!product){
        throw createHttpError.NotFound("couldn't find the product")
    }

    return product

}

async function checkCourseExistence(id){
 
    if(!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("id is invalid")
    const course = await CourseModel.findById(id)
    if(!course){
        throw createHttpError.NotFound("failed to find course")
    }
    return course
}

async function checkChapterExistence(id){
    const chapter = await CourseModel.findOne({"chapters._id": id}, {"chapters.$" : 1}) 
    if(!chapter) throw createHttpError.NotFound("chapter doesn't exist")
    return chapter
}

async function getOneEpisode(episodeID){
  
    const course = await CourseModel.findOne({"chapters.episodes._id": episodeID}, {'chapters.episodes.$': 1 })   
      if(!course) throw createHttpError.NotFound("episode doesn't exist")
      const episode = course?.chapters[0].episodes?.[0]
    if(!episode) throw new createHttpError.NotFound("episode doesn't exist")
    return objectCopy(episode)
      
}

async function checkRoleExistence(title){
 const result = await roleModel.findOne({title})
 if(result) throw createHttpError.BadRequest('this role has added before ')
}

async function checkPermissionExistence(name){
    const permission = await permissionsModel.find({name})
    if(permission.length) throw createHttpError.BadRequest("permission has already been assigned")
    return true
}

async function findRoleWithIdOrTitle(field){
    let findQuery

    if (mongoose.isValidObjectId(field)){
    findQuery = {_id:field}        
    }else{
        findQuery = {title : field}
    }
    
    const role = await roleModel.find(findQuery)
  
    if(!role.length) throw createHttpError.NotFound("faild to find role")
    return role
    
}
async function findPermissionWithId(id){
    if(mongoose.isValidObjectId(id)){
        const permission = await permissionsModel.find({_id:id})
        if(!permission) throw createHttpError.NotFound("couuldn't find the permission")
        return permission
    }
}

async function getOrdersInBasket(userID , productID , courseID){
  
 if(productID){
    const basketData = await userModel.findOne({
    $and:[{_id:userID} , {'basket.products.productID': productID}]
 } , {'basket.products.$' : 1})

 const data = objectCopy(basketData)
 return data?.basket?.products[0] 
 }else if(courseID){

    const basketData = await userModel.findOne({
        $and:[{_id:userID} , {'basket.courses.courseID': courseID}]
     } , {'basket.courses.$' : 1})
    
     const data = objectCopy(basketData)
     
     return data?.basket?.courses[0] 
 }
 
 throw createHttpError.NotFound('there is no order to modify')
 



}

async function getComments(id , model){
    const foundComment = await model.findOne({'comments._id' : id} , {'comments.$': 1})
    return foundComment?.comments[0]    

}


async function getUserBasket(user){
  return  await userModel.aggregate([
        {$match :{ _id : user._id }},
        {$project : {basket  : 1}},

        {$lookup : {
            from :"products",
            localField:"basket.products.productID",
            foreignField:"_id",
            as:'productDetail'
        }},

        {$lookup : {
            from :"courses",
            localField:"basket.courses.courseID",
            foreignField:"_id",
            as:'courseDetail'
        }},


        {$addFields : {
            'productDetail' :{
            $function: {
                body: function(productDetail , basketProducts){
                       return productDetail.map(product => {

                         const count = basketProducts.find(item => item.productID.valueOf() == product._id.valueOf()).count
                         return {...product ,
                         basketCount : count,
                         totalPrice : product.price * count , 
                         finalPrice : (product.price * (100 - product.discount)/100) * count }
                        })
                },
                args:['$productDetail' , '$basket.products'],
                lang:'js'
            }
        } , 'courseDetail' :{
            $function: {
                body: function(courseDetail){

                       return courseDetail.map(course => {
                         return {...course ,
                         finalPrice : (course.price * (100 - course.discount)/100)  }
                        })
                },
                args:['$courseDetail'],
                lang:'js'
            }
        } , "payment" :{ 

                $function  : {
                    body: function(courseDetail , productDetail , basketProducts){
                        const courseAmount = courseDetail.reduce((acc , curr)=>{
                            return  acc + (curr.price * (100 - curr.discount)/100)
                        },0)
                        
                        const productAmount = productDetail.reduce((acc , curr)=>{
                            const count = basketProducts.find(item => item.productID.valueOf() == curr._id.valueOf()).count 
                            return acc += (curr.price * (100 - curr.discount)/100)*count
                        },0) 

                        const productID = productDetail.map(item => (item._id))
                        const courseID = courseDetail.map(item => (item._id))
                        return{
                            courseAmount , courseID , productAmount , productID,
                            totalPayement : courseAmount + productAmount
                        }
                    },
                    args :['$courseDetail' ,'$productDetail' , '$basket.products' ],
                    lang:'js'
                }

        }
    
    }},

            {$project : {basket : 0}}
    ])
}
module.exports = {
    checkCategoryExistence,
    checkBlogExistence,
    checkCourseExistence,
    checkChapterExistence,
    getOneEpisode,
    checkRoleExistence,
    checkPermissionExistence,
    findRoleWithIdOrTitle,
    findPermissionWithId,
    findProductById,
    getComments , 
    getOrdersInBasket,
    getUserBasket
    
}

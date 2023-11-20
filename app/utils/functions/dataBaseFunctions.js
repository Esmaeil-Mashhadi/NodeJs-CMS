const createHttpError = require("http-errors");
const { BlogModel } = require("../../models/blog");
const { CourseModel } = require("../../models/course");
const { default: mongoose } = require("mongoose");
const { roleModel } = require("../../models/role");
const { permissionsModel } = require("../../models/permission");
const { productModel } = require("../../models/product");
const { categoryModel } = require("../../models/categories");
const { objectCopy } = require("./utilityFunctions");


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

async function getComments(id , model){
    const foundComment = await model.findOne({'comments._id' : id} , {'comments.$': 1})
    return foundComment?.comments[0]    

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
    getComments
    
}

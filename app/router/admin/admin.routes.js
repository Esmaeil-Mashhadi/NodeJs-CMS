const { Router } = require("express");
const { adminCategoryRoutes } = require("./category");
const { adminBlogRoutes } = require("./blog");
const { adminProductRoutes } = require("./product");
const { adminCourseRouters } = require("./course");
const { adminChapterRouter } = require("./chapter");
const { adminEpisodeRoute } = require("./episode");
const { adminUserRoutes } = require("./user");
const { AdminRoleRoutes } = require("./role");
const { AdminPermissionsRoutes } = require("./permissions");
const { checkPermission } = require("../../http/middlewares/permission.guard");
const { PERMISSIONS } = require("../../utils/constant");

const {ADMIN, CONTENT_MANAGER , TEACHER , USER , SUPLIER } = PERMISSIONS

const router = Router()

router.use('/category' , checkPermission([CONTENT_MANAGER]) , adminCategoryRoutes)
router.use('/blogs' , checkPermission([CONTENT_MANAGER]), adminBlogRoutes)
router.use('/products', checkPermission([SUPLIER]) , adminProductRoutes)
router.use('/courses' , checkPermission([TEACHER]), adminCourseRouters)
router.use('/chapter', checkPermission([TEACHER ]) , adminChapterRouter)
router.use('/episode', checkPermission([TEACHER ]) , adminEpisodeRoute)
router.use('/users' , checkPermission([USER]), adminUserRoutes)
router.use('/role' , checkPermission([ADMIN]) ,AdminRoleRoutes)
router.use('/permissions' , checkPermission([ADMIN]), AdminPermissionsRoutes)



module.exports = {
    AdminRoutes : router
}
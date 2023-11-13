/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the blog
 *         short_text:
 *           type: string
 *           description: Short text
 *         text:
 *           type: string
 *           description: Main text
 *         tags:
 *           type: string
 *           description: Tags
 *         category:
 *           type: string
 *           description: Category
 *         image:
 *           type: file
 *           description: Image of the blog
 * 
 *       required:
 *         - title
 *         - short_text
 *         - text
 *         - tags
 *         - category
 *         - image
 * 
 *     Edit_Blog:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the blog
 *         short_text:
 *           type: string
 *           description: Short text
 *         text:
 *           type: string
 *           description: Main text
 *         tags:
 *           type: string
 *           description: Tags
 *         image:
 *           type: file
 *           description: Image of the blog
 * 
 * 
 * 
 *          
 */


/**
 * @swagger
 *  /admin/blogs : 
 *      get:
 *          tags : [Blog(AdminPanel)]
 *          summary: geting all blogs
 *          responses: 
 *              200:
 *                description:  success - gets array of blogs
 */


/**
 * @swagger
 *  /admin/blogs/{id}: 
 *      get : 
 *          tags: [Blog(AdminPanel)]
 *          summary: get Blog by ID
 *          parameters: 
 *              -   in: path
 *                  required: true 
 *                  type: string
 *                  name: id
 *          responses: 
 *                  201: 
 *                      description : sucess
 *                      content: 
 *                       application/json:
 *                           schema: 
 *                              $ref: "#/definitions/publicDefinition"
 *          
 */

/**
 * @swagger
 *   /admin/blogs/add:
 *     post: 
 *       tags: [Blog(AdminPanel)]
 *       summary: Creating a new blog
 *       requestBody: 
 *         required: true
 *         content: 
 *           multipart/form-data:
 *             schema: 
 *               $ref: "#/components/schemas/Blog"
 *       responses : 
 *         201: 
 *           description: Created 
 *           content: 
 *               application/json:
 *                   schema: 
 *                      $ref: "#/definitions/publicDefinition"
 */

/**
 * @swagger
 *  /admin/blogs/{id} : 
 *      delete :
 *         summary : removing the blog
 *         tags: [Blog(AdminPanel)]
 *         parameters: 
 *            -   in: path
 *                name: id
 *                type: string
 *                required: true
 *         responses: 
 *            200: 
 *              description: success
 */
/**
 * @swagger
 *  /admin/blogs/{id} : 
 *      patch :
 *         summary : removing the blog
 *         tags: [Blog(AdminPanel)]
 *         parameters: 
 *            -   in: path
 *                name: id
 *                type: string
 *                required: true
 *         requestBody: 
 *              required: true 
 *              content: 
 *                  multipart/form-data: 
 *                      schema : 
 *                          $ref: "#/components/schemas/Edit_Blog"
 *         responses: 
 *            200: 
 *              description: success
 */


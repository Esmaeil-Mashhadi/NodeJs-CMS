/**
 * @swagger
 * components: 
 *   schemas:    
 *      Category: 
 *        type: object
 *        required: 
 *          - title
 *        properties:
 *          title:
 *            type: string
 *            description: title of the category
 *          parent: 
 *            type: string
 *            description: parent of the category
 *      Edit_Category: 
 *        type: object
 *        properties:
 *          title:
 *            type: string
 *            description: title of the category
 *  
 */

/**
 * @swagger
 * /admin/category/add:
 *   post:
 *     tags: [Category(AdminPanel)]
 *     summary: Create a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Category"
 *     responses:
 *       '201':
 *         description: Success
 *         content: 
 *               application/json:
 *                   schema: 
 *                      $ref: "#/definitions/publicDefinition"
 */

/**
 * @swagger
 * /admin/category/parents:
 *   get:
 *      tags : [Category(AdminPanel)]
 *      summary: Gets all parent category
 *      responses: 
 *          200:
 *              description: success
 */

/**
 * @swagger
 *  /admin/category/all:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summary: get All Categories
 *          responses: 
 *              200: 
 *                  description: success
 */

/**
 * @swagger
 * /admin/category/children/{parent}:
 *      get: 
 *          tags: [Category(AdminPanel)]
 *          summary: gets the childrens
 *          parameters: 
 *          -   in: path
 *              name: parent
 *              type: string
 *              required : true
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/category/remove/{id}:
 *      delete:
 *          tags : [Category(AdminPanel)]
 *          summary: remove category with object id 
 *          parameters: 
 *            -     in : path
 *                  name: id
 *                  type: string
 *                  required: true
 * 
 *          responses : 
 *              200:
 *                  description: success
 *                   
 *               
 */

/**
 * @swagger
 * /admin/category/{id}:
 *      get: 
 *          tags: [Category(AdminPanel)]
 *          sumamry: find category by object-id
 *          parameters : 
 *              -   in : path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses: 
 *              200 : 
 *                  description: success
 *                  
 */

/** 
 * @swagger
 * /admin/category/update/{id}:
 *      patch: 
 *          tags: [Category(AdminPanel)]
 *          sumamry: editing category title
 *          parameters : 
 *              -   in : path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody: 
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded :
 *                      schema: 
 *                          $ref: "#/components/schemas/Edit_Category"
 * 
 *                  application/json :
 *                      schema: 
 *                          $ref: "#/components/schemas/Edit_Category"
 *      
 *          responses: 
 *              200 : 
 *                  description: success
 *                  
 */

/**
 * @swagger
 *  components: 
 *      schemas:    
 *        Role: 
 *            type: object
 *            required: 
 *                - title
 *            properties:
 *               title:
 *                 type: string
 *                 description: title of the role
 *               description: 
 *                  type: string 
 *                  description: elaborate the role  
 *               permissions: 
 *                   type: array
 *                   descriptions : permissions ID for role
 */



/**
 * @swagger 
 * definitions: 
 *   ListOfRoles: 
 *     type: object
 *     properties: 
 *       statusCode: 
 *         type: integer
 *         example: 200
 *       data: 
 *         type: object
 *         properties: 
 *           roles: 
 *             type: array
 *             items : 
 *               type: object
 *               properties : 
 *                 id: 
 *                   type: string
 *                 title: 
 *                   type: string
 *                 description: 
 *                  type: string 
 *                  description: elaborate the role 
 *                 permissions: 
 *                    type: array
 *                    items: 
 *                      type: object
 *                      properties: 
 *                          id: 
 *                               type: string
 *                          title: 
 *                               type: string
 *                          description: 
 *                              type: string
 *                              example : "describe the permission"
 *                            
 */

/**
 * @swagger
 *  components: 
 *      schemas:    
 *        Edit-Role: 
 *            type: object
 *            properties:
 *               title:
 *                 type: string
 *                 description: title of the role
 *               description: 
 *                  type: string 
 *                  description: elaborate the role 
 *               permissions: 
 *                   type: array
 *                   descriptions : permissions ID for role
 * 
 */



/**
 * @swagger 
 * /admin/role/add: 
 *     post : 
 *      tags: [RBAC(AdminPanel)]
 *      summary : adding new role
 *      requestBody: 
 *          required : true
 *          content: 
 *              application/x-www-form-urlencoded: 
 *                schema: 
 *                  $ref: "#/components/schemas/Role"
 *      responses: 
 *          201 : 
 *              description : created new role
 *              content: 
 *               application/json:
 *                   schema: 
 *                      $ref: "#/definitions/publicDefinition"
 */

/**
 * @swagger 
 * /admin/role/edit/{id}: 
 *     patch : 
 *      tags: [RBAC(AdminPanel)]
 *      summary : editing role
 *      parameters: 
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 * 
 *      requestBody: 
 *          required : true
 *          content: 
 *              application/x-www-form-urlencoded: 
 *                schema: 
 *                  $ref: "#/components/schemas/Edit-Role"
 *      responses: 
 *          200 : 
 *              description : created new role
 *              content: 
 *               application/json:
 *                   schema: 
 *                      $ref: "#/definitions/publicDefinition"
 */

/**
 * @swagger 
 * /admin/role/remove/{field}: 
 *     delete : 
 *      tags: [RBAC(AdminPanel)]
 *      summary : deleting the role
 *      parameters: 
 *          -   in: path
 *              name: field
 *              type: string
 *              required: true
 * 
 *      responses: 
 *          200 : 
 *              description : removed the role
 *              content: 
 *               application/json:
 *                   schema: 
 *                      $ref: "#/definitions/publicDefinition"
 */

/**
 * @swagger 
 * /admin/role/list: 
 *     get : 
 *      tags: [RBAC(AdminPanel)]
 *      summary : getting all roles
 *      responses: 
 *          200 : 
 *              description : created new role
 *              content: 
 *               application/json:
 *                   schema: 
 *                      $ref: "#/definitions/ListOfRoles"
 */

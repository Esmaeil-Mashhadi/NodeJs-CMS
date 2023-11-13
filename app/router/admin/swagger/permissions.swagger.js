/**


/**
 * @swagger
 *  components: 
 *      schemas:    
 *        permissions: 
 *            type: object
 *            required: 
 *                - name
 *                - description
 *            properties:
 *               name:
 *                 type: string
 *                 description: name of the permission
 *               description : 
 *                  type: string
 *                  description : your descriptoin of the permission
 */


/**
 * @swagger 
 * definitions: 
 *   ListOfPermissions: 
 *     type: object
 *     properties: 
 *       statusCode: 
 *         type: integer
 *         example: 200
 *       data: 
 *         type: object
 *         properties: 
 *           permissions: 
 *             type: array
 *             items : 
 *               type: object
 *               properties : 
 *                 id: 
 *                   type: string
 *                 title: 
 *                   type: string
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
 *                              example : "describe the permissions"
 *                            
 */

/**
 * @swagger
 *  components: 
 *      schemas:    
 *        Edit-Permissions: 
 *            type: object
 *            properties:
 *               name:
 *                 type: string
 *                 description: title of the permission
 *               description:
 *                   type: string
 *                   description: the desc of permission
 */



/**
 * @swagger 
 * /admin/permissions/add: 
 *     post : 
 *      tags: [RBAC(AdminPanel)]
 *      summary : adding new permissions
 *      requestBody: 
 *          required : true
 *          content: 
 *              application/x-www-form-urlencoded: 
 *                schema: 
 *                  $ref: "#/components/schemas/permissions"
 *      responses: 
 *          201 : 
 *              description : added new permissions
 *              content: 
 *               application/json:
 *                   schema: 
 *                      $ref: "#/definitions/ListOfPermissions"
 */

/**
 * @swagger 
 * /admin/permissions/edit/{id}: 
 *     patch : 
 *      tags: [RBAC(AdminPanel)]
 *      summary : editing permission
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
 *                  $ref: "#/components/schemas/Edit-Permissions"
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
 * /admin/permissions/remove/{id}: 
 *   delete : 
 *      tags: [RBAC(AdminPanel)]
 *      summary : deleting the permissions
 *      parameters: 
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 * 
 *      responses: 
 *          200 : 
 *              description : removed the permissions
 *              content: 
 *               application/json:
 *                   schema: 
 *                      $ref: "#/definitions/publicDefinition"
 */

/**
 * @swagger 
 * /admin/permissions/list: 
 *     get : 
 *      tags: [RBAC(AdminPanel)]
 *      summary : getting all permissions
 *      responses: 
 *          200 : 
 *              description : created new permissions
 *              content: 
 *               application/json:
 *                   schema: 
 *                      $ref: "#/definitions/ListOfpermissions"
 */


/**
 * @swagger
 *  components:
 *      schemas:
 *          update-profile:
 *              type: object
 *              properties:
 *                  first_name:
 *                      type: string
 *                      description: the first_name of user
 *                  last_name:
 *                      type: string
 *                      description: the last_name of user
 *                  email:
 *                      type: string
 *                      description: the email of user
 *                  username:
 *                      type: string
 *                      example: erfanyousefi
 *                      
 */

/**
 * @swagger
 * definitions: 
 *   ListOfUsers: 
 *     type: object
 *     properties: 
 *         statusCode: 
 *             type: integer
 *             example: 200
 *         data: 
 *             type: object
 *             properties: 
 *                 users: 
 *                     type: array
 *                     items: 
 *                         type: object
 *                         properties: 
 *                             _id: 
 *                                type: string
 *                             first_name: 
 *                                type: string
 *                             last_name: 
 *                                type: string
 *                             email:
 *                                type: string
 *                             mobile: 
 *                                type: string
 */


/**
 * @swagger
 *  /admin/users/list:
 *      get:
 *          tags: [Users(AdminPanel)]
 *          summary: get all of users
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: search in user first_name, last_name, username, mobile or email
 *          responses :
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfUsers'
 */
/**
 * @swagger
 *  /admin/users/profile:
 *      get:
 *          tags: [Users(AdminPanel)]
 *          summary: get user
 *          responses :
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/users/update-profile:
 *      patch:
 *          tags: [Users(AdminPanel)]
 *          summary: update user profile
 *          requestBody: 
 *              required: true 
 *              content: 
 *                  application/x-www-form-urlencoded: 
 *                          schema: 
 *                              $ref: "#/components/schemas/update-profile"
 *          responses :
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfUsers'
 */
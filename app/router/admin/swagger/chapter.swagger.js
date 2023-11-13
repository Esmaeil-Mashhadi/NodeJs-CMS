/**
 * @swagger
 *  components: 
 *      schemas: 
 *        add-chapter: 
 *              type: object
 *              required: 
 *                  -   title
 *                  -   id
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: title of the chapter
 *                  id: 
 *                      type: string
 *                      description: course id
 *                  text: 
 *                      type: string
 *                      description: text of chapter  
 *        edit-chapter: 
 *              type: object
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: title of the chapter
 *                  text: 
 *                      type: string
 *                      description: text of chapter  
 */


/**
 * @swagger
 *  /admin/chapter/add-chapter:
 *    put:
 *      tags: [Chapter(AdminPanel)]
 *      summary: Adding a new chapter
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/add-chapter"
 *          application/x-www-form-urlencoded:
 *            schema:
 *              $ref: "#/components/schemas/add-chapter"
 *      responses:
 *        200:
 *          description: Success
 *          content: 
 *              application/json: 
 *                  schema: 
 *                     $ref: "#/definitions/publicDefinition" 
 */

/**
 * @swagger
 *  definitions: 
 *      chaptersDefinition: 
 *          type: object
 *          properties: 
 *              statusCode: 
 *                  type: integer
 *                  example: 200
 *              data: 
 *                  type: object
 *                  properties: 
 *                      course: 
 *                          type: object
 *                          properties: 
 *                              -id: 
 *                                  type: string
 *                              title: 
 *                                  type: string
 *                              chapter: 
 *                                  type: array 
 *                                  items: 
 *                                     type: object
 *                                 
 *                                          
 */

/**
 * @swagger
 *  /admin/chapter/list/{courseID}: 
 *      get: 
 *         tags: [Chapter(AdminPanel)]
 *         summary: geting list of chapters by course id
 *         parameters: 
 *              -   in : path
 *                  name: courseID
 *                  required: true
 *                  type: string
 *         responses: 
 *              200: 
 *                  description: success
 *                  content: 
 *                      application/json: 
 *                          schema : 
 *                              $ref: "#/definitions/chaptersDefinition"
 *         
 */


/**
 * @swagger
 *  /admin/chapter/remove/{chapterID} : 
 *      patch: 
 *          tags: [Chapter(AdminPanel)]
 *          summary: remove chapters by chapter id
 *          parameters: 
 *              -   in: path
 *                  name: chapterID
 *                  required: true 
 *                  type: string
 *          responses: 
 *              200: 
 *                  description: success
 *                  content : 
 *                      application/json: 
 *                          schema : 
 *                              $ref: "#/definitions/publicDefinition"
 */


/**
 * @swagger 
 *  /admin/chapter/update/{chapterID}: 
 *      patch: 
 *          tags : [Chapter(AdminPanel)]
 *          summary: update chapter by id
 *          parameters: 
 *              -   in: path
 *                  name: chapterID
 *                  required: true
 *                  type: string
 *          requestBody:
 *            required: true
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: "#/components/schemas/edit-chapter"
 *              application/x-www-form-urlencoded:
 *                schema:
 *                  $ref: "#/components/schemas/edit-chapter"
 *          responses:
 *            200:
 *              description: Success
 *              content: 
 *                  application/json: 
 *                      schema: 
 *                         $ref: "#/definitions/publicDefinition" 
 *                  
 */
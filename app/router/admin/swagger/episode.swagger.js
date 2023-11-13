/**
 * @swagger 
 *  components:
 *      schemas:                    
 *         add-episode: 
 *              type: object
 *              properties:
 *                  title:
 *                      type: string 
 *                      description: title of the episode
 *                  text: 
 *                      type: string 
 *                      description: text of the episode
 *                  video : 
 *                      type: string 
 *                      description: video file
 *                      format: binary
 *                  type: 
 *                      type: string
 *                      enum:   
 *                          -   lock
 *                          -   unlock
 *                  courseID : 
 *                      type: string
 *                      description: id of the course
 *                  chapterID : 
 *                      type: string
 *                      description: id of the chapter
 *              required: 
 *                  - title
 *                  - text
 *                  - type
 *                  - video
 *                  - courseID
 *                  - chapterID
 * 
 *         edit-episode: 
 *              type: object
 *              properties:
 *                  title:
 *                      type: string 
 *                      description: title of the episode
 *                  text: 
 *                      type: string 
 *                      description: text of the episode
 *                  video : 
 *                      type: string 
 *                      description: video file
 *                      format: binary
 *                  type: 
 *                      type: string
 *                      enum:   
 *                          -   lock
 *                          -   unlock

 *          
 */



/**
 * @swagger 
 * definitions: 
 *   add-episode-example: 
 *     type: object
 *     properties: 
 *       statusCode: 
 *         type: integer
 *         example: 201
 *       data: 
 *         type: object
 *         properties: 
 *           episodes: 
 *             type: array
 *             items : 
 *               type: object
 *               properties : 
 *                 id: 
 *                   type: string
 *                 title: 
 *                   type: string
 *                 text: 
 *                   type: string
 *                 video: 
 *                   type: string
 *                   example: "00:00:00"
 *                 type:
 *                   type: string
 *                   example : lock || unlock
 *                 courseID : 
 *                   type: string
 *                 chapterID :
 *                   type: string
 */
/**
 * @swagger
 *  /admin/episode/add:
 *    post:
 *      tags: [Episodes(AdminPanel)]
 *      summary: Adding a new episode
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              $ref: "#/components/schemas/add-episode"
 *          application/x-www-form-urlencoded:
 *            schema:
 *              $ref: "#/components/schemas/add-episode"
 *      responses:
 *        201:
 *          description: Success
 *          content: 
 *              application/json: 
 *                  schema: 
 *                     $ref: "#/definitions/add-episode-example"
 */

/**
 * @swagger
 *  /admin/episode/remove/{episodeID}:
 *    delete:
 *      tags: [Episodes(AdminPanel)]
 *      summary: remove an episode
 *      parameters: 
 *          -   in : path
 *              name: episodeID
 *              type: string
 *              required: true
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
 *  /admin/episode/edit/{episodeID}:
 *    patch:
 *      tags: [Episodes(AdminPanel)]
 *      summary: edit an episode
 *      parameters: 
 *          -   in : path
 *              name: episodeID
 *              type: string
 *              required: true
 *      requestBody: 
 *          required: true
 *          content: 
 *            multipart/form-data: 
 *                  schema: 
 *                      $ref: "#/components/schemas/edit-episode"
 *          
 *      responses:
 *        200:
 *          description: Success
 *          content: 
 *              application/json: 
 *                  schema: 
 *                     $ref: "#/definitions/publicDefinition"
 */
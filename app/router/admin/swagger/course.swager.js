/**
 * @swagger
 *      components: 
 *          schemas : 
 *              Type : 
 *                  type: string
 *                  enum: 
 *                      -   free
 *                      -   cach
 *                      -   special                   
 */

/**
 * @swagger 
 *  components:
 *      schemas:                    
 *         add-course: 
 *              type: object
 *              required: 
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   price
 *                  -   discount
 *                  -   image
 *                  -   type
 *                  -   time
 *                  -   category
 *              properties:
 *                  title:
 *                      type: string 
 *                      description: title of course
 *                  short_text: 
 *                      type: string 
 *                      description: short_text of course
 *                  text: 
 *                      type: string 
 *                      description: text of course
 *                  category: 
 *                      type: string 
 *                      description: category of the course    
 *                  tags:
 *                      type: array
 *                      description: tags of the courses
 *                  price: 
 *                      type: string 
 *                      description: price of courses
 *                  discount: 
 *                      type: string 
 *                      description: courses discount 
 *                  count : 
 *                      type: string 
 *                      description: quantity of the courses
 *                  time : 
 *                      type: string 
 *                      description: time of the courses
 *                      example : 00:00:00
 * 
 *                  image: 
 *                      type: string
 *                      format : binary
 *                  type: 
 *                      $ref : "#/components/schemas/Type" 
 *         edit-course: 
 *              type: object
 * 
 *              properties:
 *                  title:
 *                      type: string 
 *                      description: title of course
 *                  short_text: 
 *                      type: string 
 *                      description: short_text of course
 *                  text: 
 *                      type: string 
 *                      description: text of course
 *                  category: 
 *                      type: string 
 *                      description: category of the course    
 *                  tags:
 *                      type: array
 *                      description: tags of the courses
 *                  price: 
 *                      type: string 
 *                      description: price of courses
 *                  discount: 
 *                      type: string 
 *                      description: courses discount 
 *                  count : 
 *                      type: string 
 *                      description: quantity of the courses
 *                  time : 
 *                      type: string 
 *                      description: time of the courses
 *                      example : 00:00:00
 * 
 *                  image: 
 *                      type: string
 *                      format : binary
 *                  type: 
 *                      $ref : "#/components/schemas/Type" 
 *          
 */



/**
 * @swagger 
 * definitions: 
 *   ListOfCourses: 
 *     type: object
 *     properties: 
 *       statusCode: 
 *         type: integer
 *         example: 200
 *       data: 
 *         type: object
 *         properties: 
 *           courses: 
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
 *                 short_text: 
 *                   type: string
 *                 status: 
 *                   type: string
 *                   example: "notStarted | Completed | ongoing"
 *                 time: 
 *                   type: string
 *                   example: "00:00:00"
 *                 price : 
 *                   type: string
 *                   example: "10.00"
 *                 discount:
 *                   type: integer
 *                 studentCount : 
 *                   type: string
 *                 teacher :
 *                   type: string
 */

/**
 * @swagger 
 *   /admin/courses/add: 
 *     post : 
 *      tags: [Course(AdminPanel)]
 *      summary : adding new course
 *      requestBody: 
 *          required : true
 *          content: 
 *              multipart/form-data:
 *                schema: 
 *                  $ref: "#/components/schemas/add-course"

 *      responses: 
 *          201 : 
 *              description : created new course
 *              content: 
 *               application/json:
 *                   schema: 
 *                      $ref: "#/definitions/publicDefinition"
 */

/**
 * @swagger
 *  /admin/courses/list :
 *       get: 
 *          tags: [Course(AdminPanel)]
 *          summary : get all courses
 *          parameters: 
 *              -   in: query   
 *                  name: search
 *                  type: string
 *                  description: search in title
 *          responses: 
 *              200: 
 *                description: success
 *                content: 
 *                  application/json: 
 *                      schema: 
 *                          $ref : '#/definitions/ListOfCourses'
 *        
 */

/**
 * @swagger 
 *  /admin/courses/list/{id} : 
 *      get: 
 *         tags: [Course(AdminPanel)]
 *         summary : getting course by id 
 *         parameters: 
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required : true
 *                  descirption : id of the course
 *         responses: 
 *              200: 
 *                  description: success
 */


/**
 * @swagger 
 *   /admin/courses/edit/{id} : 
 *     patch : 
 *      tags: [Course(AdminPanel)]
 *      summary : Edit course
 *      parameters: 
 *          -   in: path
 *              type: string
 *              name: id 
 *              required : true
 *      requestBody: 
 *          required : true
 *          content: 
 *              multipart/form-data:
 *                schema: 
 *                  $ref: "#/components/schemas/edit-course"

 *      responses: 
 *          200 : 
 *              description : edit course
 *              content: 
 *               application/json:
 *                   schema: 
 *                      $ref: "#/definitions/publicDefinition"
 */



/**
 * @swagger
 *  components:
 *      schemas:
 *          product:
 *              type: object
 *              required: 
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   price
 *                  -   discount
 *                  -   count
 *                  -   category
 *                  -   type
 *              properties:
 *                  title:
 *                      type: string 
 *                      description: title of product
 *                  short_text: 
 *                      type: string 
 *                      description: short_text of product
 *                  text: 
 *                      type: string 
 *                      description: text of product
 *                  category: 
 *                      type: string 
 *                      description: category of the product 
 *                  type: 
 *                      type: array
 *                      items : 
 *                          type : string
 *                          enum: 
 *                              -   virtual 
 *                              -   physical 
 *                      description : virtual or physical
 *                  tags : 
 *                      type: string 
 *                      description: tags of product
 *                  price: 
 *                      type: string 
 *                      description: price of product
 *                  discount: 
 *                      type: string 
 *                      description: product discount 
 *                  count : 
 *                      type: string 
 *                      description: quantity of the product
 *                  weight : 
 *                      type: string 
 *                      description: weight of the product
 *                  height : 
 *                      type: string 
 *                      description: height of the product
 *                  width: 
 *                      type: string 
 *                      description: width of the product
 * 
 *                  length: 
 *                      type: string 
 *                      description: length of the product
 *                  
 *                  images: 
 *                      type: array 
 *                      items: 
 *                          type: string
 *                          format : binary
 *                          description: image of the product
 * 
 *                  colors:
 *                      type: array
 *                      items: 
 *                          type: string
 *                          enum:
 *                              -   black
 *                              -   white
 *                              -   gray                
 *                              -   red
 *                              -   blue
 *                              -   green
 *                              -   orange
 *                              -   purple
 */

/**
 * @swagger 
 *      components: 
 *          schemas: 
 *            edit-product: 
 *               type: object
 *               properties: 
 *                  title:
 *                      type: string 
 *                      description: title of product
 *                  short_text: 
 *                      type: string 
 *                      description: short_text of product
 *                  text: 
 *                      type: string 
 *                      description: text of product
 *                  category: 
 *                      type: string 
 *                      description: category of the product 
 *                  type: 
 *                      type: array
 *                      items : 
 *                          type : string
 *                          enum: 
 *                              -   virtual 
 *                              -   physical 
 *                      description : virtual or physical
 *                  tags : 
 *                      type: string 
 *                      description: tags of product
 *                  price: 
 *                      type: string 
 *                      description: price of product
 *                  discount: 
 *                      type: string 
 *                      description: product discount 
 *                  count : 
 *                      type: string 
 *                      description: quantity of the product
 *                  weight : 
 *                      type: string 
 *                      description: weight of the product
 *                  height : 
 *                      type: string 
 *                      description: height of the product
 *                  width: 
 *                      type: string 
 *                      description: width of the product
 * 
 *                  length: 
 *                      type: string 
 *                      description: length of the product
 *                  
 *                  images: 
 *                      type: array 
 *                      items: 
 *                          type: string
 *                          format : binary
 *                          description: image of the product
 * 
 *                  colors:
 *                      type: array
 *                      items: 
 *                          type: string
 *                          enum:
 *                              -   black
 *                              -   white
 *                              -   gray                
 *                              -   red
 *                              -   blue
 *                              -   green
 *                              -   orange
 *                              -   purple
 */         


/**
 * @swagger
 *  /admin/products/add: 
 *      post:
 *          tags: [product(AdminPanel)] 
 *          summary: creating product
 *          requestBody : 
 *              required: true 
 *              content : 
 *                  multipart/form-data: 
 *                    schema: 
 *                      $ref: "#/components/schemas/product"  
 * 
 *          responses: 
 *             201: 
 *              description: created new product 
 *              content: 
 *               application/json:
 *                   schema: 
 *                      $ref: "#/definitions/publicDefinition"
 *          
 */

/**
 * @swagger 
 *  /admin/products/list: 
 *      get: 
 *          tags: [product(AdminPanel)] 
 *          summary: getting all products
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: customize your search base on title
 * 
 *          responses: 
 *              200: 
 *               description: Success 
 *          
 *          
 */

/**
 * @swagger
 *  /admin/products/{id}: 
 *      get: 
  *        tags: [product(AdminPanel)] 
  *        summary: getting product by id 
  *        parameters: 
  *             -   in: path
  *                 name: id
  *                 type: string
  *                 description: object id of product
  *                 required : true
  *        responses: 
  *             200 :
  *                description: success
  *                 

 */

/**
 * @swagger
 *  /admin/products/remove/{id} : 
 *    delete: 
 *      tags: [product(AdminPanel)]
 *      summary: removing product
 *      parameters: 
 *          -   in: path
 *              name: id
 *              required : true
 *              type: string
 *      responses:
 *          200:
 *              description : success
 */

/**
 * @swagger
 *  /admin/products/edit/{id}: 
 *      patch:
 *          tags: [product(AdminPanel)] 
 *          summary: creating product
 *          parameters: 
 *              -   in: path
 *                  name: id
 *                  required: true
 *                  description: product id
 *                  type: string
 *          requestBody : 
 *              required: true 
 *              content : 
 *                  multipart/form-data: 
 *                    schema: 
 *                      $ref: "#/components/schemas/edit-product"  
 * 
 *          responses: 
 *             200: 
 *              description: updated the product 
 *          
 */


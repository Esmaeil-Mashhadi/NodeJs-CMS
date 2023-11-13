const express = require('express');
const { default: mongoose } = require('mongoose');
const path = require('path');
const { AllRoutes } = require('./router/router');
require('dotenv').config()
const morgan = require('morgan');
const createError = require('http-errors')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const cors = require("cors")

class Application {
  #app = express()
  #DB_URL;
  #PORT;
  constructor(PORT , DB_URL){
    this.#PORT = PORT,
    this.#DB_URL = DB_URL

   this.connectToMongoDB()
   this.initRedis()
   this.configApplication() 
   this.createRoutes()
   this.createServer()
   this.errorHandling()
  }


  connectToMongoDB(){
    mongoose.connect(this.#DB_URL).then(()=>console.log("connected to data base"))
    .catch(()=>console.log("failed to connect to DB"))
 
    process.on("SIGINT" , async()=>{
      await mongoose.connection.close();
      process.exit(0)
    } )
  
  }

  initRedis(){
    require("./utils/init_redis")
  }

  configApplication(){
    this.#app.use(cors())
    this.#app.use(morgan('dev'))
    this.#app.use(express.json())
    this.#app.use(express.urlencoded({extended:true}))
    this.#app.use(express.static(path.join(__dirname , ".." , "public")))
    this.#app.use('/api-doc' , swaggerUI.serve, swaggerUI.setup(swaggerJsDoc({
      swaggerDefinition:{
        openapi: "3.0.0",
        info:{
          title:"My Node Store",
          version:'2.0.0',
          description:"testing my backend development skills",
          contact:{
            name:"Esmaeil Mashhadi",
            email:'the.alchemist.boy100@gmail.com'
          }
        },
        
        servers:[
          {url:'http://localhost:3000'}
        ], 
        components: {
          securitySchemes: {
            BearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat :"JWT",

            }
          }
        },
        security:[{
          BearerAuth:[]
        }],

      },
      apis:['./app/router/**/*.js']
    }),
    {explorer:true} //in the setup right after swaggerJsDoc , second input 
    ))
  }

  createRoutes(){
    this.#app.use(AllRoutes)
  }

  createServer(){
    const http = require('http')
    const server=  http.createServer(this.#app)
    server.listen(this.#PORT , ()=>{
        console.log("server ran on http://localhost:" + this.#PORT);
    })
  }

  errorHandling(){
    this.#app.use((req , res , next)=>{
      next(createError.NotFound("coundn't find the address"))
    })

    this.#app.use((err ,req ,res , next)=>{
      const serverError = createError.InternalServerError()
        const statusCode = err.status || serverError.status
        const message = err.message || serverError.message

        return res.status(statusCode).json({
           err:{
            statusCode,
            message,
           }
        })
    })
  }


}

module.exports = Application
   

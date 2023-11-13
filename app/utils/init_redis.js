const redisDB = require("redis")
const redisClient = redisDB.createClient();

redisClient.connect()
redisClient.on("connect" , ()=> console.log('connected to redis'))
redisClient.on("ready" , ()=> console.log('ready to use'))
redisClient.on('end' , ()=> console.log("disconnected from redis"))
redisClient.on("error" , (err)=> console.log("redisError" , err.message))




module.exports = redisClient

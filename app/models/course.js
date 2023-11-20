const { commentSchema } = require("./public.schema");
const {getCourseTime} = require('../utils/functions/utilityFunctions');
const { default: mongoose, model } = require("mongoose");



const Episodes =  new mongoose.Schema({
    title:{type:String , required: true},
    text: {type:String , required : true},
    type: {type:String ,deafult : "unlock"},
    time: {type:String , required: true},
    videoAddress:{type: String , required: true}

}, {toJSON: {virtuals: true}})


Episodes.virtual('videoUrl').get(function(){
    return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.videoAddress}`
})

const chapter = new mongoose.Schema({
    title: {type:String , required: true},
    text : {type:String , default :""},
    episodes :{type:[Episodes] , default: []}
})
const CourseSchema = new mongoose.Schema({
    title : {type: String, required : true},
    short_text : {type: String, required : true},
    text : {type: String, required : true},
    image : {type:String, required : true},
    tags : {type: [String], default : []},
    category : {type: mongoose.Types.ObjectId, ref: "category", required : true},
    comments : {type: [commentSchema], default : []},
    likes : {type: [mongoose.Types.ObjectId],ref:'user', default : []},
    dislikes : {type: [mongoose.Types.ObjectId],ref:'user', default : []},
    bookmarks : {type: [mongoose.Types.ObjectId],ref:'user', default : []},
    price : {type: Number, default : 0},
    type : {type: String, default: "free"/*free, cash, special */, required : true},
    discount : {type: Number, default : 0},
    status : {type: String ,default :"not started"},/**not started , ongoing , completed */
    status: {type: String, default: "notStarted" /*notStarted, Completed, Holding*/},
    teacher : {type: mongoose.Types.ObjectId, ref: "user", required : true},
    chapters : {type: [chapter], default: []},
    students : {type : [mongoose.Types.ObjectId], default : [], ref: "user"},
},{toJSON:{
    virtuals: true
}})

CourseSchema.virtual("imageURL").get(function(){
    return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.image}`
})

CourseSchema.virtual("totalTime").get(function(){
    return getCourseTime(this.chapters || [])
})
const CourseModel = model("courses" , CourseSchema)

CourseSchema.index({title : "text"})

module.exports = {
    CourseModel
}

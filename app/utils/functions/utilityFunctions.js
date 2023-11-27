const fs = require('fs')
const moment = require('moment-jalali')
const path  = require('path')


function randomNumberGenrator(){
    return Math.floor((Math.random() * 90000) + 10000)
}
function objectCopy(object){
    return JSON.parse(JSON.stringify(object)) 
}

function deleteInvalidData(data = {} , blackListData =[]){

    let nullishData = ["" , " " , 0 , null , undefined]

    Object.entries(data).forEach(([key , value])=>{

        if(nullishData.includes(value)) delete data[key]
        if(blackListData.includes(key)){
            delete data[key]
        }else if (typeof(data[key]) == 'string'){
            data[key] = data[key].trim()
        }else if(Array.isArray(data[key])){
            data[key] = data[key].map(item => item.trim())
        }else if (Array.isArray(data[key]).length == 0){
            delete data[key]
        }
    })

    
  
}

function getVideoTime(seconds){
    const total = Math.round(seconds)/60
    let [minutes , percent] = String(total).split('.')
    let second = Math.round((percent * 60)/100).toString().substring(0,2)
    let hours = 0

    if(minutes > 60){
        total = minutes /60 
        let [h1 , percent] = String(total).split(".")
        hours = h1
        minutes = Math.round((percent * 60)/100).toString().substring(0,2)
    }
    if(String(second).length == 1) second = `0${second}`
    if(String(minutes).length == 1) minutes = `0${minutes}`
    if(String(hours).length == 1) hours = `0${hours}`
    return (hours + ":" + minutes+":"+ second)

}

function deleteFileInPublic(fileAddress){
    if(fileAddress){
        const pathFile = path.join(__dirname, ".."  , '..', "public" , fileAddress)
        if(fs.existsSync(pathFile)){
            fs.unlinkSync(pathFile)
        }
    }
}

function listOfImagesFromRequest(files , fileUploadPath){
    if(files?.length >0){
        return files.map(file =>{
            return path.join(fileUploadPath , file.filename)    
        }).map(url => (url.replace(/\\/g , "/")))
    }else{
        return []
    }
}


function setFeatures(productResult){
    const {width , length , height , weight , colors} = productResult
    let features = {}   
    features.colors = colors
    if(!isNaN(+width) || !isNaN(+height) || !isNaN(+length) || !isNaN(+weight)){
    !width ? features.width = 0 : features.width = +width
    !length ? features.length = 0 : features.length = +length
    !height ? features.height = 0 : features.height = +height
    !weight ? features.weight = 0 : features.weight = +weight
}    
return features
}

function getCourseTime(chapters = []){
    let time , hour , minutes , seconds = 0
  
    for (const chapter of chapters) {
           const {episodes}  = chapter

            for (const episode of episodes) {

                if(episode?.time) time = episode.time.split(":") //[hour , min , sec]
                else return time = "00:00:00".split(':')
                if(time.length == 3){
                    seconds += Number(time[0]) * 3600 
                    seconds += Number(time[1]) * 60
                    seconds += Number(time[2]) 
                    
                }else if(time.length == 2){
                    seconds += Number(time[0]) * 60
                    seconds += Number(time[1])
                }
            }
    }

    
   
    hour = Math.floor(seconds/ 3600) 
    minutes = Math.floor(seconds/60) % 60 
    seconds = Math.floor(seconds % 60) 
    if(String(hour).length == 1) hour =`0${hour}`
    if(String(minutes).length == 1) minutes =`0${minutes}`
    if(String(seconds).length == 1) seconds =`0${seconds}`
    

    return `${hour}:${minutes}:${seconds}`
}

function invoiceNumberGenerator(){
    return moment().format("YYYYMMDDHHmmssSSS") + String(process.hrtime()[1].padStart(9,0))
}


module.exports = {
    randomNumberGenrator,
    deleteFileInPublic,
    listOfImagesFromRequest,
    setFeatures,
    objectCopy,
    deleteInvalidData,
    getVideoTime,
    getCourseTime,
    invoiceNumberGenerator
}

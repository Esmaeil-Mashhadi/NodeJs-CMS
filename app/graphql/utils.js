const { Kind } = require("graphql");

function parseValueNode(valueNode){
    switch(valueNode.kind){
        case Kind.STRING:
        case Kind.BOOLEAN:
            return valueNode.value

        case Kind.INT:
        case Kind.FLOAT:
            return valueNode.value
        case Kind.OBJECT:
            parseObject(valueNode.value)
        case Kind.LIST :
            return valueNode.values.map(parseValueNode)
        default: 
            return null
    }
}

function parseLiteral(valueNode){
        switch(valueNode.kind){
            case Kind.STRING:
                return valueNode.value.charAt(0) == "{" ? JSON.parse(valueNode.value) :  valueNode.value
            case Kind.INT:
            case Kind.FLOAT:
                return Number(valueNode.value)
            case Kind.OBJECT:
                return parseObject(valueNode)
            
}}


function toObject(value){
    if(typeof value == "object"){
        return value
    }
    if(typeof value == 'string' && value.charAt(0) == "{"){
        return JSON.parse(value)
    }

    return null
}


function parseObject(valueNode){
    const value = Object.create(null)
    valueNode.fields.forEach(item =>{
        value[item.name.value] = parseValueNode(item.value)
    })

    return value
}


module.exports ={
    toObject , 
    parseLiteral,
    parseValueNode,
}



/**
 * value == {object fields with its values : _id , title , parent}
 * valueNode == data wholeObject properties
 * valueNode.value = value of that properties
 * valueNode.fields ==> categories
 * item ==> title , children 
 * item.name : title 
 * item.name.value = techindustry
 * item.value = object or string or .. type
 * 
 */
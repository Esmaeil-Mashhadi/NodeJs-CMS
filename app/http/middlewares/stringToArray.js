const stringToArray = (...args)=>{
    
 return function(req , res , next){

        const arguments = args
        arguments.map(field =>{
            
         if(req.body[field]){
        
            if(typeof(req.body[field])  === 'string'){

                if(req.body[field].indexOf("#") >= 0){

                    req.body[field] = req.body[field].split("#").map(item => {
                        if(item.length>0){
                            return item.trim()
                        } 
                    }).filter(item => (item))

                } else if (req.body[field].indexOf(",") >= 0){

                 return req.body[field] = req.body[field].split(",").map(item => {

                        if(item.length > 0){
                            return item.trim()
                        }
                    }).filter(item => (item))
                   
                    

                }else{
                    
                   return req.body[field] = [req.body[field].trim()]
                }

            }else if(Array.isArray(req.body[field])){

                req.body[field] = req.body[field].map(item =>  (item.trim()))
            }else{

            req.body[field] = [req.body[field]]

            }
            
        }
        req.body[field] = []
        })

        next()
    }
}



module.exports = {
    stringToArray
}
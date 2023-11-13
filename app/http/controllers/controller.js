const autoBindInheritance = require("auto-bind-inheritance");


module.exports = class Controller {
    constructor(){
        autoBindInheritance(this)
    }

};
const  mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,'Please enter recipe name'],
        trim:true,
        maxLength:[100,'Product name cannot exceed 100 characters']
    },
    ingredients:{
        type: Array,
        required:[true,'Please enter product ingredients'],
        
    },
    instructions:{
        type: String,
        required:[true,'Please enter product instructions'],
        
    },
    image:{
            type: String,
           required:true,

        

    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
    
})

let schema = mongoose.model('Recipe',recipeSchema)
module.exports = schema
const recipes = require('../data/recipes.json')
const Recipe = require('../models/recipeModel')
const dotenv = require('dotenv')
const connectDatabase = require('../config/database')

dotenv.config({path:"backend/config/config.env"})
connectDatabase()


const seedProducts = async ()=>{
    try{
        await Recipe.deleteMany()
        console.log('All recipe deleted')
        await Recipe.insertMany(recipes);
        console.log('All recipe inserted')
    }catch(error){
        console.log(error.message)
    }
    process.exit()
    
}

seedProducts()
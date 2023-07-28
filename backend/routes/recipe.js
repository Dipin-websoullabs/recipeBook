const express = require('express')
const {  getRecipes, getSingleRecipe} = require('../controllers/recipeController')
const router = express.Router()



router.route('/recipes').get(getRecipes)
router.route('/product/:id').get(getSingleRecipe)
                    

module.exports = router
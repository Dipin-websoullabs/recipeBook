const Recipe = require('../models/recipeModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError')
const APIFeatures = require('../utils/apiFeatures')

//Get Products - /api/v1/products   (/api/v1 defined in app.js, /products set in routes/product)
exports.getRecipes = catchAsyncError(async (req,res,next)=>{
    


    try {
        const resPerPage = 4;
        const apifeatures =  new APIFeatures(Recipe.find(),req.query).search().filter().paginate(resPerPage)
        
        const recipes = await apifeatures.query;
        res.status(200).json({
            success:true,
            count:recipes.length,
            recipes   
        })
    } catch (error) {
        res.status(400).json({
            
            error
              
        })
        
    }
    

});



//Get Single Product - /api/v1/product/:id 
exports.getSingleRecipe = catchAsyncError(async (req,res,next)=>{
    console.log("single")
    const product = await Recipe.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler('Product not found', 400));
       
    }
    res.status(201).json({
        success:true,
        recipe 
    })

});


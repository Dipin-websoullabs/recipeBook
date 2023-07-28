const catchAsyncError = require('../middlewares/catchAsyncError');
const User = require('../models/userModel');
const sendEmail = require('../utils/email');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwt');
const crypto = require('crypto')
const jwt = require('jsonwebtoken');

//Register User - /api/v1/register
exports.registerUser = catchAsyncError(async (req, res, next) => {

  
    const {name, email, password} = req.body

 

    const user = await User.create({
        name,
        email,
        password
    });

    

    sendToken(user, 201, res) 
    

})


//Login User - /api/v1/login
exports.loginUser = catchAsyncError(async (req, res, next) => {
  
    // console.log(req.body.email)
    // console.log(req.body.password)
    const {email, password} =  req.body

    if(!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    //finding the user database
    const user = await User.findOne({email}).select('+password');//to get the value of password field from mongodb used .select('+password), in userschema select gave as false. so this methode used to get values. otherwise it will not return

    if(!user) {
        return next(new ErrorHandler('Invalid email or password', 401))
    }
    
    if(!await user.isValidPassword(password)){
        return next(new ErrorHandler('Invalid email or password', 401))
    }

    sendToken(user, 201, res)
    
})

//Logout - /api/v1/logout
exports.logoutUser = (req, res, next) => {
    res.cookie('token',null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    .status(200)
    .json({
        success: true,
        message: "Loggedout"
    })

}

//add to fav
 exports.addToFav =  catchAsyncError(async (req, res, next) => {

    console.log("backend")
   console.log(req.body)
   
    const { recipeId,userId } = req.body
    try {
        
      

    
       
       
        const user = await User.findByIdAndUpdate(
          req.body.userId,
          { $addToSet: { favoriteRecipes: recipeId } },
          { new: true } 
        );
    
        if (!user) {
        
          return res.status(404).json({ error: 'User not found' });
        }
    
        
        res.status(200).json({user});
      } catch (error) {

        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    
 
})

//update
//add to fav
exports.update =  catchAsyncError(async (req, res, next) => {

   
   console.log("back")
   
    let newUserData = {
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        favoriteFoods: req.body.favoriteFoods,
        
    }

  
    try {
        
      

    
       
       
        const user = await User.findByIdAndUpdate(req.body.userId, newUserData, {
            new: true,
            runValidators: true,
        })
    
        if (!user) {
        
          return res.status(404).json({ error: 'User not found' });
        }
    
        
        res.status(200).json({user});
      } catch (error) {

        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    
 
})
 

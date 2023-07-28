const express = require('express');
// const multer = require('multer');
// const path = require('path')

// const upload = multer({storage: multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, path.join( __dirname,'..' , 'uploads/user' ) )
//     },
//     filename: function(req, file, cb ) {
//         cb(null, file.originalname)
//     }
// }) })


 const { 
     registerUser,
     loginUser,
     logoutUser,
     addToFav,
     update
    
  } = require('../controllers/authController');

const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate')

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/addToFav').put(addToFav);
router.route('/update').put(update);


module.exports = router;

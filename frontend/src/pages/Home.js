import React, { Fragment, useEffect, useState } from 'react'
import './home.css'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { register,clearAuthError, logout,addToFavorites } from '../redux/actions/userActions';
import { toast } from 'react-toastify';
import { getRecipes } from '../redux/actions/recipeActions';
import MetaData from '../components/MetaData';
import { Button, Card, Typography,AppBar, Toolbar} from '@mui/material'
import Loader from '../components/Loader';
import SearchBox from '../components/searchbox/SearchBox';
import FavoriteIcon from '@mui/icons-material/Favorite';


function Home() {

  const [items, setItems] = useState([]);
  const [readmore, setReadmore] = useState(false)
  const [popupItem, setPopUpItem] = useState('')
  const [addToFavoritesSuccess, setAddToFavoritesSuccess] = useState(false);

    const { loading:authLoading, isAuthenticated, user, error: authError } = useSelector(state => state.authState)
    const { loading, error, recipes  } = useSelector(state => state.recipesState)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

const handleLogout = () =>{
   dispatch(logout)
}
const toggleModal = () => { 
  setReadmore(!readmore)
}

useEffect(() => {
  
  dispatch(getRecipes(null))
 
}, [dispatch]);

const handleAddToFavorites = (recipeId) => {
  
  const isRecipeInFavorites = user.favoriteRecipes.includes(recipeId);

 
  if (!isRecipeInFavorites) {
    dispatch(addToFavorites(recipeId,user._id));
    
    
  } else {
    toast("Recipe already in Favorites", {
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'error',
       onOpen: () => { dispatch(clearAuthError) }
    })
   
  }
};

const handleRedirectToLogin =() =>{

  toast("Login First", {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'error',
     onOpen: () => { dispatch(clearAuthError) }
  })

}
useEffect(()=>{
  
      
   
   if (authError) {
    toast(authError, {
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'error',
       onOpen: () => { dispatch(clearAuthError) }
    })
    
  }
  if (error) {
    toast(error, {
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'error',
       onOpen: () => { dispatch(clearAuthError) }
    })
    
  }
 
 },[authError,error])



useEffect(() => {
  
  if (Array.isArray(recipes)) {
    setItems(recipes.map((recipe) => ({ ...recipe })));
  }
}, [recipes]);
const handleReadMore = (itemId) => {
  setPopUpItem(itemId)
  setReadmore(!readmore)
};
const WORD_LIMIT = 20;

  return (
    <>
    <Fragment>
    
    { <MetaData title={'Home'} />}
    {loading || authLoading ? <Loader/>:
      <Fragment>
    <div className='homeMain'> 
    <AppBar id=''>
        <Toolbar id="navBar">
        <div className='navB2'>
          
       
       
        <Link className='link' to={'/'}><Typography id='headB1'>Recipe Shop</Typography></Link>
       
       </div>
       {user?
       <div className='navSub'>
        <Typography id='headB2'>hello {user.name}</Typography>
       <Typography onClick={handleLogout} id='headB3'>Logout</Typography><Link className='link' to={'/profile'}><Typography id='headB4'>Profile</Typography></Link></div>:<div className='navSub'>
       <Link className='link' to={'/signup'}><Typography id='headB5'>Register</Typography></Link>
       <Link className='link' to={'/login'}><Typography id='headB6'>Login</Typography></Link></div>
      }
         
       
        
         
      
      
       
       </Toolbar>
       

       
      </AppBar>

    <div className='HomeSearchBox'><SearchBox/></div>
    <div className='homeCardMain' >
    { items && items.map((item) => (
    <Card id='homeCard' key={item._id} >
   
      <Typography>{item.name}</Typography>
     
      <img className='cardImage' src={item.image} alt='recipe'/>
      <Typography>
                      {`${item.instructions
                            .split(" ")
                            .slice(0, WORD_LIMIT)
                            .join(" ")}...`}
                    </Typography>

    <div className='homeCardNF'>
      {user? <Button
          disableRipple
          color={user.favoriteRecipes.includes(item._id) ? "secondary" : "primary"}
          startIcon={<FavoriteIcon />}
          onClick={() => handleAddToFavorites(item._id)}
        >
       
        </Button>:
    <Button
          disableRipple
          color= "primary"
          startIcon={<FavoriteIcon />}
          onClick={() => handleRedirectToLogin()}
        >
       
        </Button>}
                    {item.instructions.split(" ").length > WORD_LIMIT && (
                      <Button onClick={() => handleReadMore(item._id)}>
                        {"Read More"}
                      </Button>
                        )}</div> 

    </Card>
    ))}
    </div>
    </div>
    </Fragment>
    }
    </Fragment>
    { readmore &&
        <div className='modal'>
          <div className='overlay'></div>
          <div className='modal-contentD'>
          { items && items.map((item) => (<>
      {  item._id === popupItem && 
      <div className='popMainDiv'>
      <Typography>{item.name}</Typography>
      <img className='cardImage' src={item.image} alt='recipe'/>
      <Typography>ingredients</Typography>
      <Typography>{Array.isArray(item.ingredients) ? item.ingredients.join(" . ") : ""}</Typography>
      <Typography>instructions</Typography>
      <Typography>{item.instructions}</Typography>
      <Button id='popupClose' onClick={toggleModal}>Close</Button>
    </div>
    }
      </>
    ))}
  
          
          </div>
        </div>
  
      }
    </>
      
  )
}

export default Home
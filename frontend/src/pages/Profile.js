import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { register,clearAuthError, logout,addToFavorites, update } from '../redux/actions/userActions';
import { toast } from 'react-toastify';
import { getRecipes } from '../redux/actions/recipeActions';
import MetaData from '../components/MetaData';
import { Button, Card, Typography,AppBar, Toolbar} from '@mui/material'
import Loader from '../components/Loader';
import SearchBox from '../components/searchbox/SearchBox';
import './profile.css'

function Profile() {

    const [items, setItems] = useState([]);
    const [readmore, setReadmore] = useState(false)
    const [popupItem, setPopUpItem] = useState('')
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [favoriteFoods, setFavoriteFoods] = useState('');
  
  
      const { loading:authLoading, isAuthenticated, user, error: authError } = useSelector(state => state.authState)
      const { loading, error, recipes  } = useSelector(state => state.recipesState)
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const location = useLocation();
  
  const handleLogout = () =>{
     dispatch(logout)
     navigate('/')
  }
  const toggleModal = () => { 
    setReadmore(!readmore)
  }
  
  useEffect(()=>{
    if(user){
        if (user.address){
            setAddress(user.address)
            
            
          }
          if (user.phoneNumber){
              setPhoneNumber(user.phoneNumber)
              
              
          }
          if (user.favoriteFoods){
              setFavoriteFoods(user.favoriteFoods)
              
              
          }

    }
    
        
  
   },[user,dispatch])
 
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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('address', address)
    formData.append('phoneNumber', phoneNumber)
    formData.append('favoriteFoods',favoriteFoods)
    formData.append('userId',user._id)
    // console.log(formData.get('email'));
    dispatch(update(formData))
   
   
    setAddress('');
    setPhoneNumber('');
    setFavoriteFoods('');
  };
    

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
      <div className='ProfilePage'><Typography id='ProfileTypo1'>Profile Page</Typography></div>
      <div className='ProfilePage1'>
      <form className="formContainer" onSubmit={handleSubmit}>
      <div className="formRow">
        <label htmlFor="address" className="formLabel">
          Address:
        </label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div className="formRow">
        <label htmlFor="phoneNumber" className="formLabel">
          Phone Number:
        </label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>
      <div className="formRow">
        <label htmlFor="favoriteFoods" className="formLabel">
          Favorite Foods:
        </label>
        <textarea
          id="favoriteFoods"
          value={favoriteFoods}
          onChange={(e) => setFavoriteFoods(e.target.value)}
          required
        />
      </div>
      <button className='formButton' type="submit">Submit</button>
    </form>
        
    </div>
    <div className='YourRecipe'>
            <Typography id='yourFav'>Your Favourites</Typography>
        </div>
    <div className='HomeSearchBoxP'><SearchBox/></div>
    <div className='homeCardMain' >
    { items && items.map((item) => (<>
       {user.favoriteRecipes.includes(item._id) ?  
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
     
                    {item.instructions.split(" ").length > WORD_LIMIT && (
                      <Button onClick={() => handleReadMore(item._id)}>
                        {"Read More"}
                      </Button>
                        )}</div> 

    </Card>
    : null}
    </>
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

export default Profile
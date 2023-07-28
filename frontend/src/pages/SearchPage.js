import React, { Fragment, useEffect, useState } from 'react'
import './home.css'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate,useParams} from "react-router-dom";
import { register,clearAuthError, logout } from '../redux/actions/userActions';
import { toast } from 'react-toastify';
import { getRecipes } from '../redux/actions/recipeActions';
import MetaData from '../components/MetaData';
import { Button, Card, Typography,AppBar, Toolbar} from '@mui/material'
import Loader from '../components/Loader';
import SearchBox from '../components/searchbox/SearchBox';


function SearchPage() {

  const [items, setItems] = useState([]);
  const [readmore, setReadmore] = useState(false)
  const [popupItem, setPopUpItem] = useState('')

  const { keyword } = useParams()

const { isAuthenticated, user } = useSelector(state => state.authState)
const { loading, error, recipes  } = useSelector(state => state.recipesState)


const dispatch = useDispatch();
const navigate = useNavigate();

const handleLogout = () =>{
   dispatch(logout)
}
const toggleModal = () => { 
  setReadmore(!readmore)
}

useEffect(() => {
  
  dispatch(getRecipes(null))
 
}, [dispatch]);

useEffect(() => {
  
   
    dispatch(getRecipes(keyword))
   

  }, [dispatch,keyword]);

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
    {loading ? <Loader/>:
      <Fragment>
    <div className='homeMain'> 
    <AppBar id=''>
        <Toolbar id="navBar">
        <div className='navB2'>
          
       
       
        <Link className='link' to={'/'}><Typography id='headB1'>Recipe Shop</Typography></Link>
       
       </div>
       {isAuthenticated?
       <div className='navSub'>
        <Typography>hello {user.name}</Typography>
       <Typography onClick={handleLogout} id='headB1'>Logout</Typography></div>:<div className='navSub'>
       <Link className='link' to={'/signup'}><Typography id='headB1'>Register</Typography></Link>
       <Link className='link' to={'/login'}><Typography id='headB1'>Login</Typography></Link></div>
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

                   
                    {item.instructions.split(" ").length > WORD_LIMIT && (
                      <Button onClick={() => handleReadMore(item._id)}>
                        {"Read More"}
                      </Button>
                        )}

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

export default SearchPage
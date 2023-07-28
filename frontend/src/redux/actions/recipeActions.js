import {
    recipesRequest, 
    recipesSuccess, 
    recipesFail,
  
} from '../slices/recipesSlice';

import axios from 'axios';



export const getRecipes = (keyword) => async (dispatch) => {
    

        try {  
            dispatch(recipesRequest()) 
           
            let link = `/api/v1/recipes/?`;
            if(keyword){
                link += `keyword=${keyword}`
            }
           
            const { data }  =  await axios.get(link);
            dispatch(recipesSuccess(data))
        } catch (error) {
            
            dispatch(recipesFail(error.response.data.message))
        }
        
}

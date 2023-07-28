import { createSlice } from "@reduxjs/toolkit";


const recipesSlice = createSlice({
    name: 'recipes',
    initialState: {
        loading: false,
        recipes: {},
      
  
    },
    reducers: {
        recipesRequest(state, action){
            return {
                
                loading: true
            }
           
        },
        recipesSuccess(state, action){
            return {
               
                loading: false,
                recipes: action.payload.recipes
            }
        },
        recipesFail(state, action){
            return {
                
                loading: false,
                error:  action.payload
            }
        },

 
 
    }
});

const { actions, reducer } = recipesSlice;

export const { 
    recipesRequest, 
    recipesSuccess, 
    recipesFail,

} = actions;

export default reducer;
import {
    loginFail,
    loginRequest, 
    loginSuccess, 
    clearError,
    registerFail,
    registerRequest,
    registerSuccess,
    logoutSuccess,
    logoutFail,
    addToFavRequest,
    addToFavSuccess,
    addToFavFail,
    updateRequest,
    updateSuccess,
    updateFail
  
} from '../slices/authSlice';

import axios from 'axios';
import { recipesFail } from '../slices/recipesSlice';


export const login = (userData) => async (dispatch) => {

        try {
            dispatch(loginRequest())
            const config = {
                headers: {
                    'Content-type': 'application/json'
                }
            }
            const { data }  = await axios.post(`/api/v1/login`,userData,config);
            dispatch(loginSuccess(data))
        } catch (error) {
            dispatch(loginFail(error.response.data.message))
        }

}

export const clearAuthError = dispatch => {
    dispatch(clearError())
}

export const register = (userData) => async (dispatch) => {

    try {
        dispatch(registerRequest())
        //console.log(userData.get('email'));
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data }  = await axios.post(`/api/v1/register`,userData,config);
        dispatch(registerSuccess(data))
    } catch (error) {
        dispatch(registerFail(error.response.data.message))
    }

}


export const logout =  async (dispatch) => {

    try {
        await axios.get(`/api/v1/logout`);
        dispatch(logoutSuccess())
    } catch (error) {
        dispatch(logoutFail)
    }

}
export const addToFavorites = (recipeId,userId) => async(dispatch) => {

   
    try {
        dispatch(addToFavRequest())
       
        const { data }  = await axios.put(`/api/v1/addToFav`,{recipeId,userId});
        console.log(data)
      
        dispatch(addToFavSuccess(data))

    } catch (error) {
        dispatch(addToFavFail(error.response.data.message))
        
    }
}
export const update = (userData) => async (dispatch) => {

    try {
        dispatch(updateRequest())
        //console.log(userData.get('email'));
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data }  = await axios.put(`/api/v1/update`,userData,config);
        dispatch(updateSuccess(data))
    } catch (error) {
        dispatch(updateFail(error.response.data.message))
    }

}

import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name:'auth',
    initialState:{
         loading: false,
         isAuthenticated:false,
         isUpdated: false
    },
    reducers:{
        loginRequest(state,action){
            return{
                ...state,
                loading: true
            }
        },
        loginSuccess(state,action){
            return{
                loading:false,
                isAuthenticated:true,
                user: action.payload.user
            }
        },
        loginFail(state,action){
            return {
                ...state,
                loading: false,
                error:action.payload
            }
        },clearError(state,action){
            return {
                ...state,
                
                error:null
            }
        }, registerRequest(state, action){
            return {
                ...state,
                loading: true
                
            }
        }, 
        registerSuccess(state, action){
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        },
        registerFail(state, action){
            return {
                ...state,
                loading: false,
                
                error: action.payload
            }
        },logoutSuccess(state, action){
            return {
                loading: false,
                isAuthenticated: false,
                
            }
        },
        logoutFail(state, action){
            return {
                ...state,
                error: action.payload
            }
        },
        addToFavRequest(state, action){
            return {
                ...state,
                loading: true
                
            }
        }, 
        addToFavSuccess(state, action){
            return {
                ...state,
                user: action.payload.user,
                loading:false
               
            }
        },
        addToFavFail(state, action){
            return {
                ...state,
                loading: false,
                
                error: action.payload
            }
        },
        updateRequest(state, action){
            return {
                ...state,
                loading: true
                
            }
        }, 
        updateSuccess(state, action){
            return {
                ...state,
                user: action.payload.user,
                loading:false
               
            }
        },
        updateFail(state, action){
            return {
                ...state,
                loading: false,
                
                error: action.payload
            }
        }
    }
});

const {actions,reducer }= authSlice;

export const {
    loginRequest,
    loginSuccess,
    loginFail,
    clearError,
    registerRequest,
    registerSuccess,
    registerFail,
    logoutFail,
    logoutSuccess,
    addToFavRequest,
    addToFavSuccess,
    addToFavFail,
    updateRequest,
    updateSuccess,
    updateFail
    }= actions;

export default reducer;
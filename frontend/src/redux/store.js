import {combineReducers, configureStore} from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import authReducer from './slices/authSlice'
import recipesReducer from './slices/recipesSlice'

const reducer = combineReducers({
    authState: authReducer,
    recipesState: recipesReducer
   

})

const store = configureStore({
    reducer,
    middleware :[thunk]
})

export default store;

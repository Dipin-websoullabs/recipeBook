import { useSelector } from 'react-redux';
import {Navigate} from 'react-router-dom';
import Loader from './Loader';

export default function ProtectedRoute ({children, isAdmin}) {
    const { isAuthenticated, loading, admin } = useSelector(state => state.authState)

    if(!isAuthenticated) {
        return <Navigate to="/" />
    }

    if(isAuthenticated) {
       
        return children;
    }

    if(loading) {
        return <Loader/>
    }

   
}
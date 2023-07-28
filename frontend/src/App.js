import logo from './logo.svg';
import './App.css';
import { HelmetProvider } from 'react-helmet-async';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import Profile from './pages/Profile';



function App() {
  return (
    
    <div className="App">
      <HelmetProvider>
        <ToastContainer theme='dark'/>
     <Routes>
      <Route exact path='/login' element= {<Login/>}/>
      <Route exact path='/signup' element= {<SignUp/>}/>
      <Route exact path='/' element= {<Home/>}/>
      <Route exact path='/search/:keyword' element= {<SearchPage/>}/>
      <Route exact path='/profile' element= {<Profile/>}/>
      
      </Routes>
      </HelmetProvider>
    </div>
  );
}

export default App;

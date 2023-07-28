import React, { Component,useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import './SearchBox.css';
import { useLocation, useNavigate } from 'react-router-dom'

function SearchBox()  {
  
  const navigate = useNavigate();
  const location = useLocation();
  const [keyword, setKeyword] = useState("")

  const searchHandler = (e) => {
    console.log(keyword)
    e.preventDefault();
    if(keyword){
   navigate(`/search/${keyword}`)
  }
   

}
const clearKeyword = () =>{
  setKeyword("");
}

// useEffect(() => {
//   if(location.pathname === '/') {
//       clearKeyword();
//   }
  

 
// },[location,keyword])

 

  

 
    return (
      
        <form onSubmit={searchHandler}>
          <div className="search-box">
            <input
              type="text"
              value={keyword}
              onChange={(e)=>{ setKeyword(e.target.value) }}
              placeholder="Search"
              
            />
            <button type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </form>
      );
  
}

export default SearchBox;

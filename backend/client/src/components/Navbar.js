import React,{useEffect,useState} from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar(props) {
  let location = useLocation();
  let navigate = useNavigate();


  const [userData, setUserData] = useState({});
  
  

  
  //Get user data from the API
  useEffect(() => {
    if(localStorage.getItem('token')){
      const getUserData = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/auth/getuser`, {
            method: "GET", 
          headers: {
              'Content-Type': 'application/json',
              "authToken":localStorage.getItem('token')
    
            },
          });
          if (response.ok) {
            const jsonData = await response.json();    
            setUserData(jsonData)
          } else {
            console.error('Failed to fetch data:', response.status);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      getUserData();
    }   
  }, []);
  
  const handleLogout=()=>{
    localStorage.removeItem('token')
    navigate("/login")
    setUserData('')
  }
  
 const handlTheCLick=()=>{
  if(userData===''){
    props.showAlert('Reload the page to get account details','info')
  }
 }

   

  return (
    <>
  
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">iNotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {localStorage.getItem('token')?<li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/'?'active':''}`} aria-current="page" to="/">Home</Link>
        </li>:null}
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/about'?'active':''}`} aria-current="page" to="/about">About</Link>
        </li>
        {localStorage.getItem('token')? <li className="nav-item dropdown " style={{zIndex:'0'}}>
          <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" onClick={handlTheCLick} role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="fa-regular fa-user mx-1"></i> Account
          </Link>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li className="dropdown-item"> {localStorage.getItem('token')?userData.name:''}</li>
            <li className="dropdown-item">{localStorage.getItem('token')?userData.email:''}</li>
            {localStorage.getItem('token')?<button className="dropdown-item fw-bolder" onClick={handleLogout} type="submit"   ><i class="mx-1 fa-solid fa-right-from-bracket"></i>Log out</button>:null}
         </ul>
        </li>:null}
      </ul>
      {!localStorage.getItem('token')?<form className="d-flex">
        <Link className="btn btn-success mx-1" type="submit" to='/login' style={{width:'5rem'}}>Login</Link>
        <Link className="btn btn-success mx-1" type="submit" to='/signup' style={{width:'5rem'}}>Sign up</Link>
      </form>:null}
      
    
     
    </div>
  </div>
</nav>
</>
  )
}


import React,{useState} from 'react'
import {useNavigate } from 'react-router-dom'



export const  Login =  (props) => {
 

    let navigate = useNavigate();
 const [credentials, setCredentials] = useState({email:'',password:''})
 


    const handleClick= async(e)=>{
        e.preventDefault();
        const response = await fetch("/api/auth/login", {
            method: "POST", 
            headers: {
             "Content-Type": "application/json",
              },
              body: JSON.stringify({email:credentials.email, password:credentials.password}),
            });
            const json=await response.json()
            console.log(json)
            if(json.success){
                // Save the token and redirect
                localStorage.setItem('token',json.authtoken)
                props.showAlert('Logged in successfully','success')
                navigate("/")
            }
            else{
                props.showAlert('Incorrect Credentials','danger')
            }
        
          

    }
    const onChange=(e)=>{
        setCredentials({
        ...credentials,[e.target.name] : e.target.value
        })
        }


  return (
    <>
    <div className='container '>
      
      <h3 className='my-4'>Login to continue to iNotebook</h3>
     
     <form onSubmit={handleClick}>
  <div className="mb-3" >
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name='email' onChange={onChange} value={credentials.email} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3 "  >
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={credentials.password}/>
  </div>
  <button type="submit" className="btn btn-success" >Login</button>
</form>
   <div className='my-3'>New to iNotebook ? <Link to="/signup">Signup</Link></div>
    </div>
    </>
  )
}

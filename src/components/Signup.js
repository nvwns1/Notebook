import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

export default function Signup() {
  const [credentials, setCredentials] = useState({name: "", email: "", password:"", cpassword:''})
  
  let navigate = useNavigate();
  const handleSubmit = async(e)=>{
    e.preventDefault()
    const {name, email, password} = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createUser",{
    method: "POST",
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({name, email, password})
    });
    const json =await response.json()
    if(json.success){
      console.log(json)
      localStorage.setItem('token', json['auth-Token'])
      navigate('/')
    }
  }
  
  const onChange = (e) =>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="email" className="form-label">
           Name
          </label>
          <input
            type="text"
            className="form-control"
            onChange={onChange}
            value={credentials.name}
            name="name"
            id="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            onChange={onChange}
            value={credentials.email}
            name="email"
            id="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            onChange={onChange}
            value={credentials.password}
            name="password"
            id="password"
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
          Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            onChange={onChange}
            value={credentials.cpassword}
            name="cpassword"
            id="cpassword"
            minLength={5}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

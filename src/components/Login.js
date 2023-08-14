import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

export default function Login(props) {
    const [credentials, setCredentials] = useState({email: "", password:""});
    let navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const host = "http://localhost:5000/api/auth/login";
        try {
            const response = await fetch(`${host}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({email: credentials.email, password: credentials.password}),
            });
      
            const json = await response.json();
            if(json.success){
                //save the auth token
                localStorage.setItem('token', json['auth-Token'])
                //redirect
                navigate("/");
                props.showAlert('Login Successful', 'success')
            }else{
                props.showAlert("Invalid Credentials", 'danger')
            }
          } catch (error) {
            //handles errors that may occur during the API call or response processing
            console.log("An error occured:", error);
          }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }

  return (
    <div className='container mt-3'>
      <h2>Login to Notebook</h2>
        <form  onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" onChange={onChange} value={credentials.email} name='email' id="email" aria-describedby="emailHelp" />
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={onChange} value={credentials.password} name='password' id="password" />
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

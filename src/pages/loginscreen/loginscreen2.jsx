
import React, { useEffect, useState } from "react";
import "../../css/login2.css"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginuser, resetlogin } from "../../Slice/loginSlice";
import { useDispatch, useSelector } from "react-redux";


export default function Login2() {


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {loginmessage,isloginsuccess,isloginloading}=useSelector((state)=>state.login)

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const{email,password} =formData;
  
  
  const onchange=(e)=>{
    setFormData((prevState)=>({
        ...prevState,
        [e.target.name]: e.target.value
    }))
}

   const handleLogin = (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password) {
      alert("Please enter email and password");
      return;
    }
     
        dispatch(loginuser(formData))
      };

  useEffect(() => {
    if (!loginmessage) return;

    if (isloginsuccess === true) {
        toast.success(loginmessage);
        navigate("/ItemRegister");
        dispatch(resetlogin());
    } 
    else if (isloginsuccess === false) {
        toast.error(loginmessage);
        dispatch(resetlogin());
    }
}, [
    isloginsuccess,
    loginmessage,
    navigate,
    dispatch
]);


  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
        <center>  <h1> LOGIN..!</h1></center>
          {/* <p>Welcome back! Please login to your account.</p>  */}
        </div>

        <div className="login-divider"></div>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <span className="input-icon"><svg style={{marginTop:10}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg></span>
            <input
              type="text"
              placeholder="Username or Email"
              name="email"
              onChange={onchange}
              autoComplete="email"
              required
            />
          </div>

          <div className="input-group">
            <span className="input-icon"><svg style={{marginTop:10}}  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-key-fill" viewBox="0 0 16 16">
  <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
</svg></span>
            <input
            //   type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              onChange={onchange}
              autoComplete="current-password"
              required
            />

            {/* <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button> */}
          </div>

  
          <button type="submit" className="login-button">
            Login
          </button>
        </form>

     
      </div>
    </div>
  );
}



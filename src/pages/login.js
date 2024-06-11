import '../pagecss/login.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEye,AiOutlineEyeInvisible } from "react-icons/ai";

function Login(){
    const [myEmail,setmyEmail] = useState("");
    const [myPass,setmyPass] = useState("");
    const [showPass,setshowPass] = useState("password");
    const [visible,setvisible] = useState("hide");
    const [invisible,setinvisible] = useState("eye");
  
  
    const handleEmailChange = (e) => {
      setmyEmail(e.target.value);
    }
  
    const handlePassChange = (e) => {
      setmyPass(e.target.value);
    }
  
    const handleSubmit = (e) => {
      console.log(`Email: ${myEmail}, Password: ${myPass}`);
      setmyEmail("");
      setmyPass("");
      e.preventDefault();
    }
  
    const handleToggle = () => {
      if(showPass==="password"){
        setshowPass("text");
        setvisible("eye");
        setinvisible("hide");
      }
      else{
        setshowPass("password");
        setinvisible("eye");
        setvisible("hide");
      }
    }

return(
        <>
          <form className="login">
            <h1>Login</h1>
            <input className="myEmail" value={myEmail} onChange={handleEmailChange} type="text" placeholder="Enter your email"/>
            <div className="myPass">
              <input 
                className="myPassinput" 
                value={myPass} 
                onChange={handlePassChange} 
                type={showPass} 
                placeholder="Enter your Password"
                autoComplete="on"
              />
              <AiOutlineEye className={visible} onClick={handleToggle} />
              <AiOutlineEyeInvisible className={invisible}  onClick={handleToggle} />
            </div>
            <div className="remember">
              <input type="checkbox" name="myCheckbox" />
              <p className="me">Remember Me</p>
              <p style={{
                color: "blue",
                cursor: "pointer"
              }}>Forgot Password?</p>
            </div>
            <button className="mySubmit" type="submit" onClick={handleSubmit}>
              Login Now
            </button>
            <div className="notaccount">
              <p>Don't have an account?</p>
              <p style={{
                color: "blue",
                cursor: "pointer"
              }}><Link to="/signup">SignUp Now</Link></p>
            </div>
          </form>
        </>
    );
}

export default Login;
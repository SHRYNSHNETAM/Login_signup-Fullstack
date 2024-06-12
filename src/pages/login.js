import '../pagecss/login.css';
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { AiOutlineEye,AiOutlineEyeInvisible } from "react-icons/ai";

function Login(){
    const navigate = useNavigate();
    const [myEmail,setmyEmail] = useState("");
    const [myPass,setmyPass] = useState("");
    const [showPass,setshowPass] = useState("password");
    const [visible,setvisible] = useState("hide");
    const [invisible,setinvisible] = useState("eye");
    const [errorMessage, setErrorMessage] = useState("");
  
    const handleEmailChange = (e) => {
      setmyEmail(e.target.value);
    }
  
    const handlePassChange = (e) => {
      setmyPass(e.target.value);
    }
  
    function isValidEmail(email) {
      // Define a regular expression pattern for email validation.
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let check = pattern.test(email);
      return check;
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      
      let checkEmail=isValidEmail(myEmail);

      if(myEmail===""){
        checkEmail=false;
        setErrorMessage("Email cannot be Empty!");
      }
      else if(checkEmail===false){
        setErrorMessage("Please Enter a valid Email");
      }
      else if(myPass===""){
        setErrorMessage("Please Enter a Password!");
      }

      let retrievedvalue = JSON.parse(localStorage.getItem(`${myEmail}`));
      let matchdetails = true;

      if(retrievedvalue===null){
        matchdetails=false;
        setErrorMessage("User not found")
      }
      else if(retrievedvalue.Pass!==myPass){
        matchdetails=false;
        setErrorMessage("Password is incorrect. Please Check!")
      }
      if(checkEmail && matchdetails){
        setmyEmail("");
        setmyPass("");
        setErrorMessage("");
        navigate("/", { state: { name: retrievedvalue.Name } });
      }
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
            <p className="error">{errorMessage}</p>
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
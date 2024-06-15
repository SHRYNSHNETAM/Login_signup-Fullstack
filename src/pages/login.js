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
    const [checked,setChecked] = useState("")
  
    const handleEmailChange = (e) => {
      setmyEmail(e.target.value);
    }
  
    const handlePassChange = (e) => {
      setmyPass(e.target.value);
    }

    const handleCheck = (e) => {
      setChecked("checked");
    }
  
    function isValidEmail(email) {
      // Define a regular expression pattern for email validation.
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let check = pattern.test(email);
      return check;
    }

    async function getData(url = "", data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      return response.json(); 
    }

    const handleSubmit = async (e) => {
      e.preventDefault();

      const userdata = { "Email": myEmail, "Pass": myPass };
      
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
      else{
        try {
          const retrievedvalue = await getData("http://127.0.0.1:8080/login", userdata);

          let matchdetails = true;
      
          if (retrievedvalue.error === 'User_not_found') {
            matchdetails = false;
            setErrorMessage("User not found");
          } else if (retrievedvalue.error === 'Wrong Password') {
            matchdetails = false;
            setErrorMessage("Password is incorrect. Please Check!");
          }
      
          if (checkEmail && matchdetails){
            if(checked==="checked") localStorage.setItem('Users', JSON.stringify(retrievedvalue));
            setmyEmail("");
            setmyPass("");
            setErrorMessage("");
            setChecked("");
            navigate("/", { state: retrievedvalue });
          }
        } catch (error) {
          console.error('Error:', error);
          setErrorMessage("An error occurred while trying to log in");
        }
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
              <input type="checkbox" name="myCheckbox" defaultChecked={checked} onChange={handleCheck} />
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
import '../pagecss/signup.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEye,AiOutlineEyeInvisible } from "react-icons/ai";

function Signup() {
  const [myName,setmyName] = useState("");
  const [myEmail,setmyEmail] = useState("");
  const [myPass,setmyPass] = useState("");
  const [myPass1,setmyPass1] = useState("");
  const [showPass,setshowPass] = useState("password");
  const [showPass1,setshowPass1] = useState("password");
  const [visible,setvisible] = useState("hide");
  const [invisible,setinvisible] = useState("eye");
  const [visible1,setvisible1] = useState("hide");
  const [invisible1,setinvisible1] = useState("eye");

  const handleNameChange = (e) => {
    setmyName(e.target.value);
  }
  const handleEmailChange = (e) => {
    setmyEmail(e.target.value);
  }

  const handlePassChange = (e) => {
    setmyPass(e.target.value);
  }

  const handlePassChange1 = (e) => {
    setmyPass1(e.target.value);
  }

  const handleSubmit = (e) => {
    let checkName = true, checkEmail=true, checkPass=true, checkPass1=true;
    
    if(checkName && checkEmail && checkPass && checkPass1){
      setmyName("");
      setmyEmail("");
      setmyPass("");
      setmyPass1("");
    }
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

  const handleToggle1 = () => {
    if(showPass1==="password"){
      setshowPass1("text");
      setvisible1("eye");
      setinvisible1("hide");
    }
    else{
      setshowPass1("password");
      setinvisible1("eye");
      setvisible1("hide");
    }
  }

  return(
    <>
      <form className="login">
        <h1>SignUp</h1>
        <input className="myEmail" value={myName} onChange={handleNameChange} type="text" placeholder="Enter your Name"/>
        <input className="myEmail" value={myEmail} onChange={handleEmailChange} type="text" placeholder="Enter your Email"/>
        <div className="myPass">
          <input 
            className="myPassinput" 
            value={myPass} 
            onChange={handlePassChange} 
            type={showPass} 
            placeholder="Create a Password"
            autoComplete="on"
          />
          <AiOutlineEye className={visible} onClick={handleToggle} />
          <AiOutlineEyeInvisible className={invisible}  onClick={handleToggle} />
        </div>
        <div className="myPass">
          <input 
            className="myPassinput" 
            value={myPass1} 
            onChange={handlePassChange1} 
            type={showPass1} 
            placeholder="Confirm your Password"
            autoComplete="on"
          />
          <AiOutlineEye className={visible1} onClick={handleToggle1} />
          <AiOutlineEyeInvisible className={invisible1}  onClick={handleToggle1} />
        </div>
        <div className="remember">
          <input type="checkbox" name="myCheckbox" />
          <p className="me">I accept all Terms & Conditions</p>
        </div>
        <button className="mySubmit" type="submit" onClick={handleSubmit}>
          SignUp Now
        </button>
        <div className="notaccount">
          <p>Already have an account?</p>
          <p style={{
            color: "blue",
            cursor: "pointer"
          }}><Link to="/login">Login Now</Link></p>
        </div>
      </form>
    </>
  );
}

export default Signup;
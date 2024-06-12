import '../pagecss/signup.css';
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { AiOutlineEye,AiOutlineEyeInvisible } from "react-icons/ai";

function Signup() {
  const navigate = useNavigate();
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
  const [errorMessage, setErrorMessage] = useState("");
  const [checked, setchecked] = useState("");

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

  function handlePassword() {
    let checkPass=false;
    let new_pass = myPass;
    let new_pass1 = myPass1;

    if(new_pass!==new_pass1)

    var lowerCase = /[a-z]/g;
    var upperCase = /[A-Z]/g;
    var numbers = /[0-9]/g;
    if(new_pass==="" || new_pass1===""){
      setErrorMessage("Password cannot be Empty!");
    }
    else if(new_pass!==new_pass1){
      setErrorMessage("Password and Confirm Password should be same!");
    }
    else if (!new_pass.match(lowerCase)) {
       setErrorMessage("Password should contains lowercase letters!");
    } else if (!new_pass.match(upperCase)) {
       setErrorMessage("Password should contain uppercase letters!");
    } else if (!new_pass.match(numbers)) {
       setErrorMessage("Password should contains numbers also!");
    } else if (new_pass.length < 10) {
       setErrorMessage("Password length should be more than 10.");
    } else {
        checkPass=true;
       setErrorMessage("");
    }
    return checkPass;
  }  

  function isValidEmail(email) {
    // Define a regular expression pattern for email validation.
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let check = pattern.test(email);
    return check;
  }

  const handleSubmit = (e) => {
    let checkName = true, checkcheckBox=true;

    let tempmail = myEmail;
    let checkEmail=isValidEmail(tempmail);

    let checkPass = handlePassword();

    if(myName===""){
      checkName=false;
      setErrorMessage("Name cannot be Empty!")}
    else if(myEmail===""){
      checkEmail=false;
      setErrorMessage("Email cannot be Empty!")
    }
    else if(checked===""){
      checkcheckBox=false;
      setErrorMessage("Please accept all the terms & conditions")
    }
    else if(checkEmail===false){
      setErrorMessage("Please Enter a valid Email")
    }
    if(checkName && checkEmail && checkPass && checkcheckBox){
      localStorage.setItem(`${myEmail}`,JSON.stringify({"Name":`${myName}`, "Email":`${myEmail}`, "Pass":`${myPass}`}));
      setmyName("");
      setmyEmail("");
      setmyPass("");
      setmyPass1("");
      setchecked("");
      setErrorMessage("");
      setinvisible("eye");
      setinvisible1("eye");
      setvisible("hide");
      setvisible1("hide");
      navigate("/login");
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

  const handleCheck = () => {
    if(checked==="checked"){
      setchecked("");
    }
    else{
      setchecked("checked");
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
        <p className="error">{errorMessage}</p>
        <div className="remember">
          <input defaultChecked={checked} type="checkbox" name="myCheckbox" onChange={handleCheck} />
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
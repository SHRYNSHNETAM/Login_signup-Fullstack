import React from 'react';
import { useLocation,useNavigate } from 'react-router-dom';

function Home(){
    const navigate = useNavigate();
    const location = useLocation();
    
    let { Name,Email,Pass } = location.state || {};

    if(!Name){
        const user = JSON.parse(localStorage.getItem('Users'));
        if(user!==null){
            Name=user.Name;
            Email=user.Email;
            Pass=user.Pass;
        }
    }

    const handleLogOut = () => {
        localStorage.removeItem('Users');
        navigate("/login");
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
    
    const handleDelete = async () =>{
        try{
            await getData("http://127.0.0.1:8080/delete", { Name,Email,Pass });

            localStorage.removeItem('Users');
            navigate("/login");
        }catch(error){
            console.error('Error:', error);
        }
    }

    return(
        <>
            <h1>Welcome {Name}, This is Home Page!! You are logged in...</h1>
            <button style={{cursor: 'pointer'}} onClick={handleLogOut}>
                Log Out
            </button>
            <button style={{backgroundColor: "Red", cursor: 'pointer', marginLeft: "10px", color: "whitesmoke"}}onClick={handleDelete}>
                Delete Account
            </button>
        </>
    );
}

export default Home;
import React from 'react';
import { useLocation,useNavigate } from 'react-router-dom';

function Home(){
    const navigate = useNavigate();
    const location = useLocation();
    const { name } = location.state || {};

    const handleLogOut = () => {
        navigate("/login");
    }
    return(
        <>
            <h1>Welcome {name}, This is Home Page!! You are logged in...</h1>
            <button onClick={handleLogOut}>
                Log Out
            </button>
        </>
    );
}

export default Home;
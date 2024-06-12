import React from 'react';
import { useLocation } from 'react-router-dom';

function Home(){
    const location = useLocation();
    const { name } = location.state || {};  
    return(
        <h1>Welcome {name}, This is Home Page!! You are logged in...</h1>
    );
}

export default Home;
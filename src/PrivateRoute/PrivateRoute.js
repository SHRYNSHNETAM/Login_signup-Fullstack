import React from 'react'
import { Navigate,useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const location = useLocation();
    let { Name } = location.state || {};
    if(!Name){
        const user = JSON.parse(localStorage.getItem('Users'));
        if(user!==null) Name=user.Name;
    }
    return Name ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
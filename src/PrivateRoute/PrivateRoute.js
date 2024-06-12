import React from 'react'
import { Navigate,useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const location = useLocation();
    const { name } = location.state || {};
    return name ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
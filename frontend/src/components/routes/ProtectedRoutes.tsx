import React from 'react';
import { Navigate } from 'react-router-dom';
import  { jwtDecode } from 'jwt-decode';

interface ProtectedRouteProps {
    children: JSX.Element;
}

interface DecodedToken {
    exp: number; // Expiration time in seconds
}

const ProtectedRoutes: React.FC<ProtectedRouteProps> = ({ children }) => {
    const token = localStorage.getItem('jwtToken');

    if (token) {
        const decodedToken = jwtDecode<DecodedToken>(token);

        // Check if token is expired
        const isTokenExpired = decodedToken.exp * 1000 < Date.now();

        if (isTokenExpired) {
            localStorage.removeItem('jwtToken');
            return <Navigate to="/signin" />;    
        }

        return children; 
    }

    return <Navigate to="/signin" />;
};

export default ProtectedRoutes;

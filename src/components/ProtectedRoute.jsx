import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';

const ProtectedRoute = ({ element }) => {
    const { user } = useUserAuth();

    console.log("Check user in Private: ", user);

    if (!user) {
        return <Navigate to="/" />;
    }

    return element;
};

export default ProtectedRoute;

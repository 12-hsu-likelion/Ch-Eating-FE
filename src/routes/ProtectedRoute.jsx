import React from 'react';
import { useAxios } from '../hooks/useAsync';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
    const location = useLocation();
    const [state, refetch] = useAxios(location.pathname);

    if(state.isLogin === undefined){
        return;
    }
    
    return (
        state.isLogin ? <Outlet /> : <Navigate replace to={"/login"} />
    );
};

export default ProtectedRoute;
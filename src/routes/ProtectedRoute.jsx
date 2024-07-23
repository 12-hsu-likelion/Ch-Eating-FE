import React, { useEffect } from 'react';
import { useAxios } from '../hooks/useAsync';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const [state, fetch] = useAxios();

    useEffect(()=>{
        fetch();
    }, []);

    if(state.isLogin === undefined){
        return;
    }
    
    return (
        state.isLogin ? <Outlet /> : <Navigate replace to={"/login"} />
    );
};

export default ProtectedRoute;
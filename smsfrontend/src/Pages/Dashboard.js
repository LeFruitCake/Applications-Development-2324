import React, { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import {  Outlet, useLocation, useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if(location.pathname === '/'){
            navigate("/home")
        }
    }, [navigate, location]);
    return (
        <div style={{height:'100vh',display:'flex',flexFlow:'column',flex:'1 1 auto'}}>
            <Navbar/>
            <Outlet/>
        </div>
    );
}

export default Dashboard;

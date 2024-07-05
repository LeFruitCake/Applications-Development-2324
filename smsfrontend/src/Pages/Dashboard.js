import React, { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import {  Outlet, useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const navigate = useNavigate();
    useEffect(() => {
        navigate("/home")
    }, [navigate]);
    return (
        <div style={{height:'100vh',display:'flex',flexFlow:'column',flex:'1 1 auto'}}>
            <Navbar/>
            <Outlet/>
        </div>
    );
}

export default Dashboard;

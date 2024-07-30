import React, { createContext, useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import {  Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const companyContext = createContext();
const Dashboard = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [companies,setCompanies] = useState([]);

    useEffect(() => {
        if(location.pathname === '/'){
            navigate("/home")
        }
        axios.get("http://localhost:8080/company/getAll")
        .then(response=>{
            setCompanies(response.data);
        })
        .catch(e=>{
            console.log(e);
        })
    }, [navigate, location]);
    return (
        <div style={{height:'100vh',display:'flex',flexFlow:'column',flex:'1 1 auto'}}>
            <companyContext.Provider value={{companies, setCompanies}}>
                <Navbar/>
                <Outlet/>
            </companyContext.Provider>
        </div>
    );

}

export {companyContext};
export default Dashboard;


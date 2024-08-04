import React, { createContext, useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import {  Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../ContextProvider/UserContext';

const companyContext = createContext();

const Dashboard = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [companies,setCompanies] = useState([]);
    const [user, setUser] = useState([]);
    

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
        axios.get(`http://localhost:8080/User/getUser`,{
            params:{
                id:localStorage.getItem("userID"),
            }
        })
        .then(response=>{
            setUser(response.data);
        })
        .catch(e=>{
            console.log(e);
        })
    }, [navigate, location]);
    return (
        <div style={{height:'100vh',display:'flex',flexFlow:'column',flex:'1 1 auto'}}>
            <UserContext.Provider value={{user, setUser}}>
                <companyContext.Provider value={{companies, setCompanies}}>
                    <Navbar/>
                    <Outlet/>
                </companyContext.Provider>
            </UserContext.Provider>
        </div>
    );

}

export {companyContext};
export default Dashboard;


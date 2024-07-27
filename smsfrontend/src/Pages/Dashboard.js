import React, { createContext, useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import {  Outlet, useLocation, useNavigate } from 'react-router-dom';

const companyContext = createContext();
const Dashboard = () => {

    

    const navigate = useNavigate();
    const location = useLocation();
    const [companies,setCompanies] = useState([
        {   'companyName':'Vicente Sotto Memorial Medical Center',
            'description':'Hospital',
            'logo':'/ccmc.png'
        },
        {   'companyName':'Cebu Normal University',
            'description':'Skwelahan',
            'logo':'/cnu.png'
        },
        {   'companyName':'Codechum',
            'description':'companya',
            'logo':'/codechum.png'
        },
        {   'companyName':'Layered',
            'description':'Test lamang',
            'logo':'/layered.png'
        },
        {   'companyName':'Vicente Sotto Memorial Medical Center',
            'description':'Test lamang',
            'logo':'/ccmc.png'
        },
        {   'companyName':'Cebu Institute of Technology - University',
            'description':'Test lamang',
            'logo':'/images.png'
        },
        {   'companyName':'Redfox',
            'description':'Test lamang',
            'logo':'/redfox.png'
        },
        {   'companyName':'Vista',
            'description':'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id risus sodales, eleifend felis quis, fringilla lorem. Nam quis bibendum elit. Vivamus nisl purus, feugiat non iaculis et, tristique nec justo. Nulla tortor magna, luctus et ante non, mattis venenatis neque. Nullam a erat eget enim volutpat rutrum. Pellentesque hendrerit ipsum sed est laoreet, nec placerat odio viverra. Ut a dictum turpis. Nunc vitae purus maximus, convallis ante eget, bibendum turpis. Maecenas in massa malesuada, aliquam felis eu, cursus nunc. Aliquam at faucibus quam, id egestas libero. Etiam vitae augue porttitor, sollicitudin neque et, convallis nisi. Suspendisse quis lectus magna. Fusce vestibulum, diam a tempor mollis, lorem tellus iaculis sapien, in pretium lorem turpis dictum nunc. Integer vehicula, orci a vehicula pellentesque, lorem mi suscipit augue, eget sagittis justo risus vel est',
            'logo':'/vista.png'
        }
    ]);
    useEffect(() => {
        if(location.pathname === '/'){
            navigate("/home")
        }
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


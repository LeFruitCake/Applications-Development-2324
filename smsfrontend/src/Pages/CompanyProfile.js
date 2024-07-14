import React from 'react';
import '../static/css/CompanyProfile.css'
import { Box, Divider, Grid, IconButton, Typography } from '@mui/material';
import B2DashboardButton from '../Components/b2DashboardButton';
import { useLocation, useNavigate } from 'react-router-dom';

const CompanyProfile = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const company = location.state.company

    const tasks = [
        {   'title':'lorem ipsum',
            'description':'test lang',
            'progress':0,
            'dueDate':new Date(),
        },
        {   'title':'Market Research',
            'description':'test lang',
            'progress':20,
            'dueDate':new Date(),
        },
        {   'title':'Business Model',
            'description':'test lang',
            'progress':100,
            'dueDate':new Date(),
        },

    ]

    const back2dashboardButtonHandler = ()=>{
        navigate('/home')
    }
    return (
        <div id='companyProfileLayout'>
            <Box id="dashboardButtonContainer" m={2}>
                <IconButton onClick={back2dashboardButtonHandler} sx={{':hover':{backgroundColor:'transparent',borderRadius:'0px'}}}>
                    <B2DashboardButton height={'30px'}/>
                    <Typography sx={{fontFamily:'poppins', fontWeight:'bold', color:'black'}}>Dashboard</Typography>
                </IconButton>
                
            </Box>
            <Box id="contentContainer">
                <Grid container>
                    <Grid item xs={12} md={5} sx={{display:'flex',justifyContent:'center', alignItems:'center'}}>
                        <img src={company.company.logo} alt='companyLogo' className='companyLogo'/>
                    </Grid>
                    <Grid item xs={12} md={6.4} textAlign={{xs:'center',md:'start'}}>
                        <Box>
                            <Typography id="companyName" variant='h6'>{company.company.companyName}</Typography>
                            <Divider></Divider>
                            <Typography variant='caption' id="companyDesc">{company.company.description}</Typography>
                        </Box>
                    </Grid>
                    
                    <Grid item xs={12} >
                        <Box className="tasksMainContainer">
                            {console.log(tasks)}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default CompanyProfile;

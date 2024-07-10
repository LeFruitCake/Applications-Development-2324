import React, { useState } from 'react';
import '../static/css/Home.css';
import { Box, Grid, IconButton, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import CompanyCard from '../Components/CompanyCard';
import SearchIcon from '@mui/icons-material/Search';

const Home = () => {

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
            'description':'Test lamang',
            'logo':'/vista.png'
        }
    ]);
    
    return (
        <div className='homeMainLayout'>
            {/* Search Bar */}
            <Grid container mt={5} >
                <Grid item xs={12} md={5} sx={{justifyContent:'center', display:'flex'}}>
                    <Typography variant='h4' fontWeight={'bold'}>List Of Startups</Typography>
                </Grid>
                <Grid item xs={12} md={7} sx={{justifyContent:'center', display:'flex'}}>
                    <OutlinedInput
                        placeholder='Search'
                        sx={{backgroundColor:'white', width:'60%'}}
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton>
                                    <SearchIcon/>
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </Grid>
            </Grid>

            {/* The list of companies */}
            <Grid container rowGap={10} sx={{paddingLeft:'calc(100vw*0.075)',paddingRight:'calc(100vw*0.01)'}} mt={5}>
                {companies.map((company)=>(
                    <Grid  item xs={12} md={3.7}>
                        <CompanyCard company={{name:company.companyName,src:company.logo}}/>
                    </Grid>
                ))}
            </Grid>
            <img src='/bulb.png' alt='bulb' style={{width:'300px',bottom:0,left:0,position:'fixed',zIndex:0}}/>
        </div>
    );
}

export default Home;

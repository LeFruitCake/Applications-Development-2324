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
            <Grid container mt={5}  width={'86vw'} margin={'0 auto'} >
                <Grid item xs={12} display={'flex'} md={5} justifyContent={{xs:'center',md:'start'}}>
                    <Typography variant='h4' fontWeight={'bold'}>List Of Startups</Typography>
                </Grid>
                <Grid item xs={12} md={7} display={'flex'} justifyContent={{xs:'center',md:'end'}}>
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
            <Grid container rowGap={10} mt={5}>
                {companies.map((company)=>(
                    <Grid className='companyCardContainer' item xs={12} md={4} sx={{display:'flex', justifyContent:'center',alignItems:'center'}}>
                            <CompanyCard company={{name:company.companyName,src:company.logo}}/>
                    </Grid>
                ))}
            </Grid>
            <img src='/bulb.png' alt='bulb' style={{width:'300px',bottom:0,left:0,position:'fixed',zIndex:0}}/>
        </div>
    );
}

export default Home;

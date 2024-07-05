import React from 'react';
import '../static/css/Home.css';
import { Grid, IconButton, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import CompanyCard from '../Components/CompanyCard';
import SearchIcon from '@mui/icons-material/Search';

const Home = () => {
    
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
            <Grid container gap={1} style={{justifyContent:'center'}} mt={5}>

                <Grid item xs={12} md={3.3}>
                    <CompanyCard company={{name:'CodeChum',src:'/codechum.png'}}/>
                </Grid>
                <Grid item xs={12} md={3.3}>
                    <CompanyCard company={{name:'Vicente Sotto Memorial',src:'/ccmc.png'}}/>
                </Grid>
                <Grid item xs={12} md={3.3}>
                    <CompanyCard company={{name:'Cebu Normal University',src:'/cnu.png'}}/>
                </Grid>

            </Grid>
            <img src='/bulb.png' alt='bulb' style={{width:'300px',bottom:0,left:0,position:'fixed',zIndex:0}}/>
        </div>
    );
}

export default Home;

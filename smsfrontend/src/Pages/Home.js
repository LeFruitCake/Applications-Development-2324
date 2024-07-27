import '../static/css/Home.css';
import { Grid, IconButton, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import CompanyCard from '../Components/CompanyCard';
import SearchIcon from '@mui/icons-material/Search';
import { useContext } from 'react';
import { companyContext } from './Dashboard';

const Home = () => {
    const {companies, setCompanies} = useContext(companyContext);
    
    return (
        <div className='homeMainLayout'>
            {/* Search Bar */}
            <Grid container mt={5}  width={'86vw'} margin={'0 auto'}>
                <Grid item xs={12} display={'flex'} md={5} justifyContent={{xs:'center',md:'start',zIndex:1}}>
                    <Typography variant='h4' fontWeight={'bold'}>List Of Startups</Typography>
                </Grid>
                <Grid item xs={12} md={7} display={'flex'} justifyContent={{xs:'center',md:'end'}}>
                    <OutlinedInput
                        placeholder='Search'
                        sx={{backgroundColor:'white', width:'60%',zIndex:1}}
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
                            <CompanyCard company={{company}}/>
                    </Grid>
                ))}
            </Grid>
            <img src='/bulb.png' alt='bulb' style={{width:'300px',bottom:0,left:0,position:'fixed',zIndex:0}}/>
        </div>
    );
}

export default Home;

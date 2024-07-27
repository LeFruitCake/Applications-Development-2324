import { Button, Grid, Stack, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { companyContext } from '../Pages/Dashboard';

const CompanyOptions = () => {
    const {companies, setCompanies} = useContext(companyContext);
    return (
        <Grid container gap={2}>
            {companies.map((company)=>(
                <Grid item xs={12} sx={{border:'solid 1px black', padding:'5px', borderRadius:'3px'}}>
                    <Grid container>
                        <Grid item xs={9}>
                            <Stack direction={'row'} sx={{display:'flex', alignItems:'center'}} gap={3}>
                                <img style={{height:'100px',width:'100px', borderRadius:'50%'}} src={company.logo} alt='companyLogo'/>
                                <Typography sx={{fontWeight:'bold'}} variant='button'>{company.companyName}</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={3} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <Button variant='contained' size='small' color='error'>Delete</Button>
                        </Grid>
                    </Grid>
                </Grid> 
            ))}
        </Grid>
    );
}

export default CompanyOptions;

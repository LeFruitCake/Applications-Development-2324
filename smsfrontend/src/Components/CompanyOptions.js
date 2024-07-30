import { Alert, Button, Grid, Stack, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { companyContext } from '../Pages/Dashboard';
import DeleteCompanyModal from './DeleteCompanyModal';

const CompanyOptions = () => {
    const {companies, setCompanies} = useContext(companyContext);
    const [flag, setFlag] = useState(false);
    return (
        <Grid container gap={2}>
            {companies.map((company)=>(
                <Grid item xs={12} sx={{border:'solid 1px black', padding:'5px', borderRadius:'3px'}}>
                    <Grid container>
                        <Grid item xs={9}>
                            <Stack direction={'row'} sx={{display:'flex', alignItems:'center'}} gap={3}>
                                <img style={{height:'100px',width:'100px', borderRadius:'50%'}} src={company.logo?company.logo:"/images.png"} alt='companyLogo'/>
                                <Typography sx={{fontWeight:'bold'}} variant='button'>{company.name}</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={3} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <DeleteCompanyModal setFlag={setFlag} companyName={company.name} id={company.id}/>
                        </Grid>
                    </Grid>
                </Grid> 
            ))}
            <Alert sx={{position:'fixed',display:flag?'flex':'none',alignSelf:'end', bottom:30,right:30, fontSize:'20px', alignItems:'center'}} severity='success'>Company successfully deleted.</Alert>
        </Grid>
        
    );
}

export default CompanyOptions;

import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import ApartmentIcon from '@mui/icons-material/Apartment';

const CreateCompany = () => {
    return (
        <Grid container>
            <Grid item xs={6}>
                <Stack direction={"column"} sx={{justifyContent:'center', alignItems:'center'}} gap={3}>
                    <ApartmentIcon sx={{fontSize:'200px'}}/>
                    <Typography variant='caption'>Upload a company logo.</Typography>
                    <input type='file' name='photoInput'/>
                </Stack>
            </Grid>
            <Grid item xs={6}>
                <form>
                    <Stack direction={"column"} sx={{justifyContent:'center'}} gap={1}>
                        <label style={{alignSelf:'start'}} for="companyName">Company Name</label>
                        <TextField name='companyName' variant='outlined'/>
                        <label style={{alignSelf:'start'}} for="companyName">Company Description</label>
                        <TextField multiline minRows={3} name='companyName' variant='outlined'/>
                        <Button sx={{alignSelf:'end', backgroundColor:'black', color:'rgb(253,204,3)', '&:hover':{boxShadow:'0px 0px 10px 0.5px', backgroundColor:'black'}}} variant='contained'>Create</Button>
                    </Stack>
                </form>


            </Grid>
        </Grid>
    );
}

export default CreateCompany;

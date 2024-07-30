import { Alert, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import ApartmentIcon from '@mui/icons-material/Apartment';
import axios from 'axios';

const CreateCompany = () => {
    const [flag,setFlag] = useState(false);
    const [alert,setAlert] = useState(false);
    const handleSubmit = (event) => {
        const form = document.getElementById("myForm");
        event.preventDefault(); // prevent default form submission
      
        const formData = new FormData(event.target);
        axios.post('http://localhost:8080/company/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
         .then((response) => {
            if(response.status === 200){
                form.reset();
                setAlert(true);
                setTimeout(() => {
                    setAlert(false)
                }, 5000);
            }else{
                setFlag(true);
            }
            console.log(response.data);
          })
         .catch((error) => {
            setFlag(true);
            console.error(error);
          });
    };

    const retractError = ()=>{
        setFlag(false);
    }

    
    
    return (
        <form id='myForm' onSubmit={handleSubmit} encType='multipart/form-data'>
        <Grid container>
            
            <Grid item xs={6}>
                <Stack direction={"column"} sx={{justifyContent:'center', alignItems:'center'}} gap={3}>
                    <ApartmentIcon sx={{fontSize:'200px'}}/>
                    <Typography variant='caption'>Upload a company logo.</Typography>
                    <input id='fileTF' type='file' name='logo'/>
                </Stack>
            </Grid>
            <Grid item xs={6}>
                
                    <Stack direction={"column"} sx={{justifyContent:'center'}} gap={1}>
                        <label style={{alignSelf:'start'}} for="name">Company Name</label>
                        <TextField onClick={retractError} error={flag} id='companyNameTF' name='name' variant='outlined'/>
                        <label style={{alignSelf:'start'}} for="companyName">Company Description</label>
                        <TextField onClick={retractError} error={flag} id='companyDescTF' multiline minRows={3} name='description' variant='outlined'/>
                        <Typography sx={{display:flag?'block':'none'}} variant='caption' color="error">Either company name is already taken or is blank.</Typography>
                        <Button type='submit' sx={{alignSelf:'end', backgroundColor:'black', color:'rgb(253,204,3)', '&:hover':{boxShadow:'0px 0px 10px 0.5px', backgroundColor:'black'}}} variant='contained'>Create</Button>
                        <Alert sx={{position:'fixed',display:alert?'flex':'none',alignSelf:'end', bottom:30,right:30, fontSize:'20px', alignItems:'center'}} severity='success'>Company successfully created.</Alert>
                    </Stack>
            </Grid>
            
        </Grid>
        </form>
    );
}

export default CreateCompany;

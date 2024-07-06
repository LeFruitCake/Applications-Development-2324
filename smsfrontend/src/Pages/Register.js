import React from 'react';
import '../static/css/register.css';
import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    const cancelButtonHandler = ()=>{
        navigate('/login');
    }

    return (
        <div id='registerContainer'>
            <img src='/fbphoto.webp' alt='bgphoto' id='bgPhoto'/>
            <Box className="registerBox" sx={{display:{xs:'none',md:'flex'}}}>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <img src='/wildcatYellow.png' alt='yellowLogo' id='yellowLogo'/>
                    <Typography variant='caption' sx={{fontFamily:'poppins', color:'white', fontSize:'15px', fontWeight:'bold'}}>WHERE VENTURES THRIVE AND IDEAS COME ALIVE</Typography>
                </div>
                <div style={{}}>
                    <img src='/2.png' alt='logo2' className='smallLogoEven'/>
                    <img src='/3.png' alt='logo3' className='smallLogoOdd'/>
                    <img src='/4.png' alt='logo4' className='smallLogoEven'/>
                    <img src='/5.png' alt='logo5' className='smallLogoOdd'/>
                    <img src='/6.png' alt='logo6' className='smallLogoEven'/>
                </div>
            </Box>
            <Box className="Box2">
                <Typography variant='h3' sx={{color:'rgb(253,204,3)'}}>Registration Form</Typography>
                <TextField variant='filled' className='textField' label="School ID"/>
                <TextField variant='filled' className='textField' label="First Name"/>
                <TextField variant='filled' className='textField' label="Surname"/>
                <TextField variant='filled' className='textField' label="Password"/>
                <TextField variant='filled' className='textField' label="Confirm Password"/>
                <Button size='large' variant='contained' sx={{backgroundColor:'rgb(253,204,3)',':hover':{backgroundColor:'rgba(253,204,3,0.7)'}, color:'black', fontWeight:'bold'}}>Register</Button>
                <Divider sx={{width:'80%', backgroundColor:'white', height:'2px'}}/>
                <Typography sx={{color:'white'}} variant='caption'>Already have an account?</Typography>
                <Button onClick={cancelButtonHandler} variant='contained' size='medium' sx={{backgroundColor:'black', color:'rgb(253,204,3)',':hover':{backgroundColor:'rgba(10,10,10,0.5)'}}}>Cancel</Button>
                <Typography variant='h4'>#FarFirstFastFocusedFerocious</Typography>
            </Box>
        </div>
    );
}

export default Register;

import React, { useState } from 'react';
import '../static/css/register.css';
import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

    const [flag,setFlag] = useState(false);
    const [message,setMessage] = useState("");
    
    const navigate = useNavigate();

    const registerUser = ()=>{
        const username = document.getElementById('usernameTF').value;
        const firstname = document.getElementById('firstnameTF').value;
        const lastname = document.getElementById("lastnameTF").value;
        const password = document.getElementById('passwordTF').value;
        const password2 = document.getElementById('password2TF').value;
        if (!username || !firstname || !lastname || !password || !password2){
            setFlag(true);
            setMessage("Please fill out all fields.")
        }else{

            if (password === password2){
                axios.post('http://localhost:8080/register',{
                    "username":username,
                    "firstname":firstname,
                    "lastname":lastname,
                    "password":password
                })
                .then(response => {
                    if(response.status === 200){
                        navigate("/login")
                    }
                })
                .catch(error => {
                    setFlag(true);
                    console.error(error);
                });
            }else{
                setFlag(true);
                setMessage("Passwords do not match.")
            }
            
        }
        
    }

    const cancelButtonHandler = ()=>{
        navigate('/login');
    }

    const retractError = ()=>{
        setFlag(false);
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
                <TextField onClick={retractError} error={flag} id='usernameTF' variant='filled' className='textField' label="School ID"/>
                <TextField onClick={retractError} error={flag} id='firstnameTF' variant='filled' className='textField' label="First Name"/>
                <TextField onClick={retractError} error={flag} id='lastnameTF' variant='filled' className='textField' label="Surname"/>
                <TextField onClick={retractError} error={flag} type='password' id='passwordTF' variant='filled' className='textField' label="Password"/>
                <TextField onClick={retractError} error={flag} type='password' id='password2TF' variant='filled' className='textField' label="Confirm Password"/>
                <Typography sx={{display:flag?'block':'none', fontSize:'15px'}} variant='caption' color="error">{message}</Typography>
                <Button onClick={registerUser} size='large' variant='contained' sx={{backgroundColor:'rgb(253,204,3)',':hover':{backgroundColor:'rgba(253,204,3,0.7)'}, color:'black', fontWeight:'bold'}}>Register</Button>
                <Divider sx={{width:'80%', backgroundColor:'white', height:'2px'}}/>
                <Typography sx={{color:'white'}} variant='caption'>Already have an account?</Typography>
                <Button onClick={cancelButtonHandler} variant='contained' size='medium' sx={{backgroundColor:'black', color:'rgb(253,204,3)',':hover':{backgroundColor:'rgba(10,10,10,0.5)'}}}>Cancel</Button>
                <Typography variant='h4'>#FarFirstFastFocusedFerocious</Typography>
            </Box>
        </div>
    );
}

export default Register;

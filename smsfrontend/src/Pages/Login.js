import React, { useEffect, useState } from 'react';
import '../static/css/Login.css';
import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [flag,setFlag] = useState(false);

    useEffect(() => {
        if(JSON.parse(localStorage.getItem("loginStatus"))){
            navigate("/home");
        }
    }, [navigate]);

    const handleLogin = ()=>{
        axios.post('http://localhost:8080/login',{
            "username":document.getElementById("usernameTF").value,
            "password":document.getElementById("passwordTF").value
        })
        .then(response => {
            if(response.status === 200){
                localStorage.setItem("userID",response.data.id)
                localStorage.setItem("loginStatus",true)
                navigate("/home")
            }else{
                setFlag(true);
            }
        })
        .catch(error => {
            console.error(error);
            setFlag(true);
        });
    }

    const retractError = ()=>{
        setFlag(false);
    }

    return (
        <div className='loginPage'>
            <img src='/HCLeft.png' alt='HCLeft' id='HCLeft' className='HC'/>
            <img src='/HCRight.png' alt='HCRight' id='HCRight' className='HC'/>
            <Box className="loginBox">
                <img src='/loginLogo.png' alt='loginLogo' id='loginLogo'/>
                <Box mt={3} className="TextContent">
                    <Typography sx={{fontFamily:'poppins', color:'white'}}>Sign in</Typography>
                    <Divider sx={{backgroundColor:'white', marginTop:1}}/>
                    <Typography sx={{fontFamily:'poppins', color:'white', marginTop:'10px'}}>Username</Typography>
                    <TextField onClick={retractError} error={flag} type='text' id='usernameTF' className='loginTextField'/>
                    <Typography sx={{fontFamily:'poppins', color:'white', marginTop:'10px'}}>Password</Typography>
                    <TextField onClick={retractError} error={flag} type='password' id='passwordTF' className='loginTextField'/>
                    <Typography sx={{display:flag?'block':'none'}} variant='caption' color="error">Invalid username or password.</Typography>
                    <Button 
                        onClick={handleLogin}
                        size='large'
                        variant='contained'
                        sx={{
                            width:'60%',
                            alignSelf:'center',
                            backgroundColor: 'black',
                            borderRadius:'15px',
                            paddingLeft:'10%',
                            marginTop:1,
                            paddingRight:'10%',
                            ':hover': {
                            backgroundColor: 'rgba(0,0,0,0.8)', // change background color on hover
                            boxShadow: '0px 0px 10px rgba(0,0,0,0.5)', // add a box shadow on hover
                            },
                        }}
                        >
                            Login
                    </Button>
                    <Typography variant='caption' sx={{fontFamily:'poppins', color:'white', marginTop:'10px', alignSelf:'center'}}>Forgot Password?</Typography>
                    <Divider sx={{backgroundColor:'white', marginTop:1}}/>
                    <Typography variant='caption' sx={{fontFamily:'poppins', color:'white', marginTop:'10px', alignSelf:'center'}}>Don't have an account yet?</Typography>
                    <Button 
                        size='small'
                        variant='contained'
                        sx={{
                            width:'50%',
                            alignSelf:'center',
                            backgroundColor: 'rgb(253,204,3)',
                            borderRadius:'15px',
                            paddingLeft:'10%',
                            marginTop:1,
                            paddingRight:'10%',
                            ':hover': {
                            backgroundColor: 'rgba(253,204,3,0.8)', // change background color on hover
                            boxShadow: '0px 0px 10px rgba(0,0,0,0.5)', // add a box shadow on hover
                            },
                        }}
                        onClick={()=>{navigate('/register')}}
                        >
                            Register
                    </Button>
                </Box>
                
            </Box>
            
        </div>
    );
}

export default Login;

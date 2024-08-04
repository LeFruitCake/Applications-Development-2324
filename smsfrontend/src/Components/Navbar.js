import { AppBar, Box, Button, Divider, Grid, IconButton, Popover, Stack, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import WilLogo from '../static/images/WILLogo.png'
import ProfileAvatar from './ProfileAvatar';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../ContextProvider/UserContext';
import axios from 'axios';


const Navbar = () => {

    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl)
    const [notifications, setNotifications] = useState([]);
    const profileClickHandler = (event)=>{
        setAnchorEl(event.target);
    }
    const profileClickHandlerExit = ()=>{
        setAnchorEl(null);
    }

    const logoutHandler = ()=>{
        localStorage.clear();
        navigate('/login');
    }

    const adminHandler = ()=>{
        profileClickHandlerExit();
        navigate('/admin')
    }
    useEffect(() => {
        console.log(user)
        if (user.accessType === "Employee") {
          axios.get(`http://localhost:8080/notifications/employee`, {
            params: {
              companyID: user.companyID,
            }
          })
            .then(response => {
              console.log(response.data);
              setNotifications(response.data)
            })
            .catch(error => {
              console.log(error);
            });
        }
        if (user.accessType === "Admin" || user.accessType === "Head Admin") {
          axios.get(`http://localhost:8080/notifications/admin`)
            .then(response => {
              console.log(response.data);
              setNotifications(response.data)
            })
            .catch(error => {
              console.log(error);
            });
        }
      }, [user]);
    
    return (
        <div style={{position:'relative',zIndex:1}}>
            {/* The Navigation Bar */}
            <AppBar position='static' 
                    style={{
                        background:'black',
                        }}>
                <Box sx={{
                        display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px',paddingInlineStart:'20px',paddingInlineEnd:'20px'
                    }}>
                    <img style={{paddingLeft:'5%',height:'auto',width:'250px'}} alt='Wildcats Logo' src={WilLogo}/>
                    <Box sx={{
                            paddingRight:'5%',
                            display:'flex',
                            justifyContent:'space-evenly',
                            alignItems:'center',
                            gap:'20px'
                    }}>
                        <Box sx={{textAlign:'right', display:'flex',flexDirection:'column'}}>
                            <Typography variant='h5' sx={{display:{xs:'none',md:'inline'}, fontFamily:'poppins'}} >
                                {user.firstname} {user.lastname}
                            </Typography >
                            <Typography variant='h6' sx={{display:{xs:'none',md:'inline'}, color:'rgb(253,204,3)',fontFamily:'poppins'}} >
                                {user.username}
                            </Typography >
                        </Box>
                        <IconButton onClick={profileClickHandler}>
                            <ProfileAvatar size="80px"/>
                        </IconButton>
                        <Popover
                            anchorEl={anchorEl}
                            open={open}
                            onClose={profileClickHandlerExit}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            >
                            <Box sx={{width:'350px', overflow:'auto', maxHeight:'250px'}}>
                                <Stack gap={1}>
                                    {notifications.slice().reverse().map((notification,id)=>(
                                        <Link
                                        style={{textDecoration:'none', color:'inherit',position:'relative',zIndex:0}}
                                        to={{
                                            pathname:`/taskpage/${notification.taskID}`,
                                        }}
                                        onClick={profileClickHandlerExit}
                                        >
                                            <Grid container sx={{marginTop:'5px', padding:'5px'}}>
                                                <Grid item xs={3}  sx={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                                                    {notification.photoURL?
                                                    <img src={`/${notification.photoURL}`} alt='logo'/>
                                                    :
                                                    <ProfileAvatar size="60px"/>
                                                    }
                                                </Grid>
                                                <Grid item xs={9} sx={{display:'flex', alignItems:'center', justifyContent:'start'}}>
                                                    <Stack direction={"row"} sx={{maxWidth:'240px', overflow:'hidden'}}>
                                                        <Typography sx={{fontWeight:'bold'}}>
                                                            {notification.username} {notification.activity === 1? 'has loaded' : notification.activity === 2? 'has accepted' : notification.activity === 3? 'has rejected' : notification.activity === 4? 'has submitted a file for': 'has completed'} {notification.taskName}
                                                        </Typography>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </Link>
                                    ))}
                                </Stack>
                            </Box>
                            <Divider sx={{margin:'10px'}}/>
                            <Stack direction={"column"} gap={1} margin={1}>
                            <Button variant='contained' sx={{
                            display: user.accessType === "Admin" || user.accessType === "Head Admin"? "block" : "none",
                            backgroundColor: 'black',
                            color: 'rgb(253,204,3)',
                            width: '100%',
                            ':hover': {
                                backgroundColor: 'rgba(0,0,0,0.8)',
                            }
                            }}
                            onClick={adminHandler}
                            >
                            Admin
                            </Button>
                                <Button variant='contained' sx={{
                                    backgroundColor:'black',
                                    color:'rgb(253,204,3)',
                                    width:'100%',
                                    ':hover':{
                                        backgroundColor: 'rgba(0,0,0,0.8)',
                                    }
                                    
                                    }}
                                    onClick={logoutHandler}
                                    >Logout</Button>
                            </Stack>
                        </Popover>
                    </Box>
                </Box>
                
                
            </AppBar>
        </div>
    );
};


export default Navbar;

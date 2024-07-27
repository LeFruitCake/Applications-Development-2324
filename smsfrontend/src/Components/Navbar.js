import { AppBar, Box, Button, Divider, IconButton, Popover, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import WilLogo from '../static/images/WILLogo.png'
import ProfileAvatar from './ProfileAvatar';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl)
    const profileClickHandler = (event)=>{
        setAnchorEl(event.target);
    }
    const profileClickHandlerExit = ()=>{
        setAnchorEl(null);
    }

    const logoutHandler = ()=>{
        navigate('/login');
    }

    const adminHandler = ()=>{
        profileClickHandlerExit();
        navigate('/admin')
    }
    
    
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
                                Jandel Macabecha
                            </Typography >
                            <Typography variant='h6' sx={{display:{xs:'none',md:'inline'}, color:'rgb(253,204,3)',fontFamily:'poppins'}} >
                                19-2605-198
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
                            <Box sx={{width:'350px'}}>
                                Test
                            </Box>
                            <Divider sx={{margin:'10px'}}/>
                            <Stack direction={"column"} gap={1} margin={1}>
                                <Button variant='contained' sx={{
                                    backgroundColor:'black',
                                    color:'rgb(253,204,3)',
                                    width:'100%',
                                    ':hover':{
                                        backgroundColor: 'rgba(0,0,0,0.8)',
                                    }
                                    
                                    }}
                                    onClick={adminHandler}
                                    >Admin</Button>
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

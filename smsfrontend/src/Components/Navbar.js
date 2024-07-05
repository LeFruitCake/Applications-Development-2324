import { AppBar, Box, Typography } from '@mui/material';
import React from 'react';
import WilLogo from '../static/images/WILLogo.png'
import ProfileAvatar from './ProfileAvatar';


const Navbar = () => {

    
    
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
                        <ProfileAvatar size="80px"/>
                    </Box>
                </Box>
                
                
            </AppBar>
        </div>
    );
};


export default Navbar;

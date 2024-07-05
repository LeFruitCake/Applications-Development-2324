import { Box } from '@mui/material';
import React from 'react';

const CompanyCard = ({company}) => {
    return (
        <div>
            <Box sx={{width:{xs:'50%',md:'70%'},position:'relative',zIndex:1, borderRadius:'10px',backgroundColor:'rgb(253,204,3)', display:'flex',flexDirection:'column',alignItems:'center', margin:'0 auto',paddingTop:'10%',paddingBottom:'10%', maxHeight:'200px',overflow:'hidden',paddingLeft:'10px',paddingRight:'10px'}}>
                <img style={{height:'auto', width:'150px'}} src={company.src} alt='logo'/>
                <h3 style={{fontFamily:'poppins', wordWrap:'break-word', maxWidth:'100%',textAlign:'center'}}>{company.name}</h3>
            </Box>
        </div>
    );
}

export default CompanyCard;

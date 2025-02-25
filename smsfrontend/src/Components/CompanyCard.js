import { Box } from '@mui/material';
import React from 'react';
import {Link} from 'react-router-dom';
import '../static/css/CompanyCard.css'



const CompanyCard = ({company}) => {
    console.log(company)
    return (
        <Box className="companyCard" sx={{width:{xs:'50%',md:'70%'},positio:'relative',zIndex:1, borderRadius:'10px',backgroundColor:'rgb(253,204,3)', paddingTop:'10%',paddingBottom:'10%', maxHeight:'200px',overflow:'hidden',paddingLeft:'10px',paddingRight:'10px'}}>
            <Link
                style={{display:'flex',flexDirection:'column',alignItems:'center', margin:'0 auto',textDecoration:'none', color:'inherit'}}
                to={{
                    pathname:`/companyProfile/${company.company.id}`,
                }}
            >
                <img style={{height:'150px', width:'150px',borderRadius:'50%'}} src={company.company.logo?company.company.logo:"/images.png"} alt='logo'/>
                <h3 style={{fontFamily:'poppins', wordWrap:'break-word', maxWidth:'100%',textAlign:'center'}}>{company.company.name}</h3>
            </Link>
        </Box>
    );
}

export default CompanyCard;

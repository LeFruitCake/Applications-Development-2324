import React from 'react';
import '../static/css/CompanyProfile.css'
import { Box, IconButton } from '@mui/material';
import B2DashboardButton from '../Components/b2DashboardButton';
import { useLocation } from 'react-router-dom';

const CompanyProfile = () => {
    const location = useLocation()
    const company = location.state.company
    return (
        <div id='companyProfileLayout'>
            <Box id="dashboardContainer">
                <IconButton>
                    <B2DashboardButton height={'100px'}/>
                </IconButton>
                Dashboard
            </Box>
            <Box id="contentContainer">
                {console.log(company)}
                {company.name}
            </Box>
        </div>
    );
}

export default CompanyProfile;

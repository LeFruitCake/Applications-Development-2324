import React from 'react';
import '../static/css/CompanyProfile.css'
import { Box, IconButton } from '@mui/material';
import B2DashboardButton from '../Components/b2DashboardButton';

const CompanyProfile = () => {
    return (
        <div id='companyProfileLayout'>
            <Box id="dashboardContainer">
                <IconButton>
                    <B2DashboardButton height={'100px'}/>
                </IconButton>
                Dashboard
            </Box>
            <Box id="contentContainer">

            </Box>
        </div>
    );
}

export default CompanyProfile;

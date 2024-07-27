import { Grid, IconButton, Typography } from '@mui/material';
import React, { useContext } from 'react';
import B2DashboardButton from '../Components/b2DashboardButton';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CreateCompany from '../Components/CreateCompany';
import { companyContext } from './Dashboard';
import CompanyOptions from '../Components/CompanyOptions';
import SetUserAccess from '../Components/SetUserAccess';

const Admin = () => {
    const {companies, setCompanies} = useContext(companyContext);
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const navigate = useNavigate();
    const back2dashboardButtonHandler = ()=>{
        navigate('/home')
    }
    console.log(companies)
    return (
        <Grid container>
            <Grid item sm={12} m={2}>
                <IconButton onClick={back2dashboardButtonHandler} sx={{':hover':{backgroundColor:'transparent',borderRadius:'0px'}}}>
                    <B2DashboardButton height={'30px'}/>
                    <Typography sx={{fontFamily:'poppins', fontWeight:'bold', color:'black'}}>Dashboard</Typography>
                </IconButton>
            </Grid>
            <Grid sm={12} item>
                <Box sx={{ width: '80%', typography: 'body1', margin:'0 auto' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Create Company" value="1" />
                            <Tab label="Company Options" value="2" />
                            <Tab label="Set User Access" value="3" />
                        </TabList>
                        </Box>
                        <TabPanel value="1">
                            <CreateCompany/>
                        </TabPanel>
                        <TabPanel value="2">
                            <CompanyOptions/>
                        </TabPanel>
                        <TabPanel value="3">
                            <SetUserAccess/>
                        </TabPanel>
                    </TabContext>
                </Box>
            </Grid>
        </Grid>
    );
}

export default Admin;

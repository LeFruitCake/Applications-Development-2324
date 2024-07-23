import '../static/css/CompanyProfile.css'
import { Box, Grid, IconButton, Stack, Typography } from '@mui/material';
import B2DashboardButton from '../Components/b2DashboardButton';
import { useLocation, useNavigate } from 'react-router-dom';
import ProgressBar from '../Components/ProgressBar';
import CreateTaskModal from '../Components/CreateTaskModal';
import EditTask from '../Components/EditTask';
import DeleteTask from '../Components/DeleteTask';

const CompanyProfile = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const company = location.state.company


    const tasks = [
        {   'title':'lorem ipsum',
            'description':'test lang',
            'progress':0,
            'dueDate':new Date(),
        },
        {   'title':'Market Research',
            'description':'test lang',
            'progress':20,
            'dueDate':new Date(),
        },
        {   'title':'Business Model',
            'description':'test lang',
            'progress':100,
            'dueDate':new Date(),
        },

    ]

    const back2dashboardButtonHandler = ()=>{
        navigate('/home')
    }
    return (
        <div id='companyProfileLayout'>
            <Box id="dashboardButtonContainer" m={2}>
                <IconButton onClick={back2dashboardButtonHandler} sx={{':hover':{backgroundColor:'transparent',borderRadius:'0px'}}}>
                    <B2DashboardButton height={'30px'}/>
                    <Typography sx={{fontFamily:'poppins', fontWeight:'bold', color:'black'}}>Dashboard</Typography>
                </IconButton>
                
            </Box>
            {/* <CreateTaskModal open={openCTModal} setOpen={setOpenCTModal} /> */}
            <Box id="contentContainer">
                <Grid container sx={{display:'flex', justifyContent:'center'}}>
                    <Grid item xs={12} md={4} sx={{display:'flex',justifyContent:'center', alignItems:'center'}}>
                        <img src={company.company.logo} alt='companyLogo' className='companyLogo'/>
                    </Grid>
                    <Grid item xs={12} md={8} textAlign={{xs:'center',md:'start'}}>
                        <Box>
                            <Typography id="companyName" variant='h6'>{company.company.companyName}</Typography>
                            {/* <Divider></Divider> */}
                            <Typography variant='caption' id="companyDesc">{company.company.description}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={10} md={10} paddingBottom={1} mt={3}>
                        <Grid container>
                            <Grid item xs={6} md={6} display={'flex'} justifyContent={'start'} alignItems={'center'}>
                                <Typography id="activeTaskLabel" sx={{fontWeight:'bold'}}>Active Tasks</Typography>
                            </Grid>
                            <Grid item xs={6} md={6} sx={{display:'flex', justifyContent:'end'}}>
                                <CreateTaskModal/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={10} sx={{backgroundColor:'white', borderRadius:'5px'}}>
                        {tasks.map((task, key)=>(
                            <Box key={key} sx={{borderBottom:'solid 1px silver', padding:'10px', '&:hover':{backgroundColor:'rgba(0,0,0,0.1)', '&:hover .dueDate':{display:'none'},'&:hover .actions':{display:'flex'}}}}>
                                <Grid container>
                                    <Grid item xs={12} md={6} >
                                        <Box sx={{padding:'20px', display:'flex', flexDirection:'column', gap:'10px'}}>
                                            <Typography variant='h5' sx={{fontWeight:'bold'}}>{task.title}</Typography>
                                            <ProgressBar value={task.progress}/>
                                            {task.progress === 0?
                                                <Typography variant='caption' sx={{fontWeight:'bold'}}>No progress yet</Typography>
                                            :
                                                <Typography variant='caption' sx={{fontWeight:'bold'}}>{task.progress}% complete</Typography>
                                            }
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={6} sx={{display:'flex',justifyContent:'end',alignItems:'center'}}>
                                        <Typography className='dueDate' variant='h6' sx={{fontFamily:'poppins',fontWeight:'bold'}}>{new Intl.DateTimeFormat('en-US', { month: 'long', day: '2-digit', year: 'numeric' }).format(task.dueDate)}</Typography>
                                        <Stack direction={'row'} gap={1} className='actions' sx={{display:'none'}}>
                                            <EditTask task={task}/>
                                            <DeleteTask/>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Box>
                        ))}
                    </Grid>
                    
                    
                </Grid>
            </Box>
        </div>
    );
}

export default CompanyProfile;

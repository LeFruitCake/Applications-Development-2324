import '../static/css/CompanyProfile.css'
import { Box, Grid, IconButton, Stack, Typography } from '@mui/material';
import B2DashboardButton from '../Components/b2DashboardButton';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import ProgressBar from '../Components/ProgressBar';
import CreateTaskModal from '../Components/CreateTaskModal';
import EditTask from '../Components/EditTask';
import DeleteTask from '../Components/DeleteTask';
import { useContext, useEffect, useState } from 'react';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import axios from 'axios';
import { UserContext } from '../ContextProvider/UserContext';

const CompanyProfile = () => {
    const [company,setCompany] = useState(null);
    const {user} = useContext(UserContext);
    const navigate = useNavigate()
    const {companyID} = useParams()
    const [reloader,setReloader] = useState(false);
    const [tasks,setTasks] = useState([]);

    useEffect(()=>{
        if(!JSON.parse(localStorage.getItem("loginStatus"))){
            navigate("/login");
        }
    },[])

    useEffect(()=>{
        axios.get(`http://localhost:8080/company/getCompany`, {
            params: {
                id: companyID
            }
        })
        .then((response=>{
            console.log(response)
            setCompany(response.data);
        }))
        .catch((error)=>{
            console.log(error);
        })
    },[])

    useEffect(() => {
        axios.get(`http://localhost:8080/StartupProfile/AllTasksByCompany?id=${companyID}`)
          .then(response => {
            setTasks(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      }, [reloader]);

    const back2dashboardButtonHandler = ()=>{
        navigate('/home')
    }
    return (
        <>
            {company?
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
                                <img src={company.logo?`/${company.logo}`:'/images.png'} alt='companyLogo' className='companyLogo'/>
                            </Grid>
                            <Grid item xs={12} md={8} textAlign={{xs:'center',md:'start'}}>
                                <Box>
                                    <Typography id="companyName" variant='h6'>{company.name}</Typography>
                                    {/* <Divider></Divider> */}
                                    <Typography variant='caption' id="companyDesc">{company.description}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={10} md={10} paddingBottom={1} mt={3}>
                                <Grid container>
                                    <Grid item xs={6} md={6} display={'flex'} justifyContent={'start'} alignItems={'center'}>
                                        <Typography id="activeTaskLabel" sx={{fontWeight:'bold'}}>Active Tasks</Typography>
                                    </Grid>
                                    <Grid item xs={6} md={6} sx={{display:'flex', justifyContent:'end'}}>
                                        {user.accessType === "Admin" || user.accessType === "Head Admin"?
                                            <CreateTaskModal id={company.id} reloader={reloader} setReloader={setReloader} userID={user.id}/>
                                            :
                                            <></>
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                            {tasks.length != 0?
                                <Grid item xs={12} md={10} sx={{backgroundColor:'white', borderRadius:'5px'}}>
                                    {tasks.map((task, key)=>(
                                        <>
                                            
                                                <Box key={key} sx={{position:'relative',borderBottom:'solid 1px silver', padding:'10px', '&:hover':{backgroundColor:'rgba(0,0,0,0.1)', '&:hover .dueDate':{display:'none'},'&:hover .actions':{display:'flex'}}}}>
                                                    <Grid container>
                                                        <Grid item xs={12} md={8} >
                                                            {user.accessType === "Admin" || user.accessType == "Head Admin" || user.companyID === company.id?
                                                                <Link
                                                                style={{textDecoration:'none', color:'inherit',position:'relative',zIndex:0, wordWrap:'break-word'}}
                                                                to={{
                                                                    pathname:`/taskpage/${task.id}`,
                                                                }}
                                                            >
                                                                    <Box sx={{padding:'20px', display:'flex', flexDirection:'column', gap:'10px'}}>
                                                                        <Typography variant='h5' sx={{fontWeight:'bold'}}>{task.title}</Typography>
                                                                        <ProgressBar value={task.progress}/>
                                                                        {task.progress === 0?
                                                                            <Typography variant='caption' sx={{fontWeight:'bold'}}>No progress yet</Typography>
                                                                        :
                                                                            <Typography variant='caption' sx={{fontWeight:'bold'}}>{task.progress}% complete</Typography>
                                                                        }
                                                                    </Box>
                                                                </Link>
                                                                :
                                                                <Box sx={{padding:'20px', display:'flex', flexDirection:'column', gap:'10px'}}>
                                                                    <Typography variant='h5' sx={{fontWeight:'bold'}}>{task.title}</Typography>
                                                                    <ProgressBar value={task.progress}/>
                                                                    {task.progress === 0?
                                                                        <Typography variant='caption' sx={{fontWeight:'bold'}}>No progress yet</Typography>
                                                                    :
                                                                        <Typography variant='caption' sx={{fontWeight:'bold'}}>{task.progress}% complete</Typography>
                                                                    }
                                                                </Box>
                                                            }
                                                        </Grid>
                                                        <Grid item xs={12} md={4} sx={{display:'flex',justifyContent:'end',alignItems:'center'}}>
                                                            
                                                            {user.accessType === "Admin" || user.accessType == "Head Admin" || user.companyID === company.id?
                                                                <>
                                                                    <Typography className='dueDate' variant='h6' sx={{fontFamily:'poppins',fontWeight:'bold'}}>
                                                                        {new Intl.DateTimeFormat('en-US', { month: 'long', day: '2-digit', year: 'numeric' }).format(new Date(task.due))}
                                                                    </Typography>
                                                                    {user.accessType === "Admin" || user.accessType === "Head Admin"?
                                                                        <Stack direction={'row'} gap={1} className='actions' sx={{display:'none'}}>
                                                                            <EditTask task={task} reloader={reloader} setReloader={setReloader} />
                                                                            <DeleteTask id={task.id} reloader={reloader} setReloader={setReloader}/>
                                                                        </Stack>
                                                                        :
                                                                        <></>
                                                                    }
                                                                </>
                                                                :
                                                                <></>
                                                            }
                                                            
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                        
                                        </>
                                    ))}
                                </Grid>
                                :
                                <Grid xs={12} md={10} item>
                                    <Stack sx={{backgroundColor:'white',justifyContent:'center',display:'flex', alignItems:'center', padding:'40px', borderRadius:'5px'}} direction={"column"}>
                                        <BedtimeIcon sx={{fontSize:'100px',color:'silver'}}/>
                                        <Typography variant='h6' sx={{color:'silver'}}>There's currently no task for this company.</Typography>
                                    </Stack>
                                </Grid>
                            }
                            
                            
                        </Grid>
                    </Box>
                </div>
                :
                <>Loading</>
            }
        </>
    );
}

export default CompanyProfile;

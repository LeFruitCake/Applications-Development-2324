import React, { useEffect, useState } from 'react';
import B2DashboardButton from '../Components/b2DashboardButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import axios from 'axios';

const TaskPage = () => {
    const location = useLocation();
    const task = location.state.task;
    const [attachments, setAttachments] = useState([]);
    const [deliverables,setDeliverables] = useState([]);
    const [submissions,setSubmissions] = useState([]);
    const back2dashboardButtonHandler = ()=>{
        window.history.back();
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/Attachments/getAllByTaskID?id=${task.id}`)
          .then(response => {
            console.log(response)
            setAttachments(response.data)
          })
          .catch(error => {
            console.log(error);
          });

          axios.get(`http://localhost:8080/Deliverables/getAllByTaskID?id=${task.id}`)
          .then(response => {
            console.log(response)
            setDeliverables(response.data)
          })
          .catch(error => {
            console.log(error);
          });
      }, []);

    return (
        <>
            <Box id="dashboardButtonContainer" m={2}>
                <IconButton onClick={back2dashboardButtonHandler} sx={{':hover':{backgroundColor:'transparent',borderRadius:'0px'}}}>
                    <B2DashboardButton height={'30px'}/>
                    <Typography sx={{fontFamily:'poppins', fontWeight:'bold', color:'black'}}>Back</Typography>
                </IconButton>
            </Box>
            <Grid container width='70%' margin='0 auto' >
                <Grid xs={12} item >
                    <Typography variant='h3' sx={{fontWeight:'bold'}}>{task.title}</Typography>
                </Grid>
                <Grid xs={12} item >
                    <Typography variant='h6' sx={{fontWeight:'bold'}}>{new Date(task.due).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}</Typography>
                </Grid>
                <Grid item xs={12} sx={{marginTop:'30px'}}>
                    <Typography variant='h6'>Instructions</Typography>
                </Grid>
                <Grid item xs={12} sx={{marginTop:'10px', paddingLeft:'10%'}}>
                    <Typography variant='h6'>{task.instructions}</Typography>
                </Grid>
                <Grid item xs={12} sx={{marginTop:'10px'}}>
                    <Typography variant='h6'>Attachments</Typography>
                    {attachments.length !== 0?
                        attachments.map((attachment)=>(
                            <Grid item xs={12} sx={{paddingLeft:'10%'}}>
                                <a href={`/${attachment.filePath}`} download={attachment.filePath}>
                                    {attachment.filePath}
                                </a>
                            </Grid>
                        )):
                        <></>
                    }
                    <Divider sx={{marginTop:'10px'}}/>
                </Grid>
                <Grid item xs={12} sx={{marginTop:'10px'}}>
                    <Typography variant='h6'>Submissions</Typography>
                </Grid>
                {deliverables.map((deliverable)=>(
                    <Grid item xs={12} sx={{marginTop:'10px'}}>
                        <Grid container sx={{backgroundColor:'rgba(0,0,0,0.1)', padding:'10px', borderRadius:'10px', boxShadow:'0px 1px 3px 0.3px'}}>
                            <Grid item xs={7}>
                                <Stack gap={1}>
                                    <Typography variant='h6'>{deliverable.title}</Typography>
                                    <Divider/>
                                    {submissions.filter((submission) => submission.deliverableID === deliverable.id).length !==0?
                                        submissions
                                        .filter((submission) => submission.deliverableID === deliverable.id)
                                        .map((filteredSubmission) => (
                                            <a href={`/${filteredSubmission.filePath}`} download={filteredSubmission.filePath}>{filteredSubmission.filePath}</a>
                                            ))
                                        :
                                        <Typography color="error">No submissions yet.</Typography>
                                    }
                                </Stack>
                            </Grid>
                            <Grid item xs={4}>

                            </Grid>
                        </Grid>
                    </Grid>
                ))}
                
            </Grid>
        </>
    );
}

export default TaskPage;

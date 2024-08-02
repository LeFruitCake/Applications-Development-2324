import React, { useContext, useEffect, useState } from 'react';
import B2DashboardButton from '../Components/b2DashboardButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { UserContext } from '../ContextProvider/UserContext';

const TaskPage = () => {
    const {user} = useContext(UserContext);
    const location = useLocation();
    const task = location.state.task;
    const [attachments, setAttachments] = useState([]);
    const [deliverables,setDeliverables] = useState([]);
    const [submissions,setSubmissions] = useState([]);
    const [reload,setReload] = useState(false);
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

      useEffect(() => {
        axios.get(`http://localhost:8080/submission/GetAllByTaskID?id=${task.id}`)
          .then(response => {
            console.log(response.data)
            setSubmissions(response.data)
          })
          .catch(error => {
            console.log(error);
          });
      }, [reload]);

      const handleSubmit = (event) => {
        event.preventDefault();
      
        const formData = new FormData();
        const form = event.target.form;
        const formElements = form.elements;
      
        for (let i = 0; i < formElements.length; i++) {
          if (formElements[i].name === 'files') {
            for (let j = 0; j < formElements[i].files.length; j++) {
              formData.append('files', formElements[i].files[j]);
            }
          } else {
            formData.append(formElements[i].name, formElements[i].value);
          }
        }
      
        axios.post('http://localhost:8080/submission/add', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          if (response.status === 200) {
            console.log('Submission successful:', response.data);
            setReload(!reload);
          } else {
            console.error('Error submitting the form:', response.status);
          }
        })
        .catch(error => {
          console.error('Error submitting the form:', error);
        });
      };

      const removeSubmission = (id)=>{
        console.log(id)
        axios.post(`http://localhost:8080/submission/remove`,null,{
            params:{
                id:id,
            }
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error)
        })
      }

    return (
        <>
            <Box id="dashboardButtonContainer" m={2}>
                <IconButton onClick={back2dashboardButtonHandler} sx={{':hover':{backgroundColor:'transparent',borderRadius:'0px'}}}>
                    <B2DashboardButton height={'30px'}/>
                    <Typography sx={{fontFamily:'poppins', fontWeight:'bold', color:'black'}}>Back</Typography>
                </IconButton>
            </Box>
            <Grid container width='70%' margin='0 auto' padding={2} sx={{backgroundColor:'rgba(0,0,0,0.05)', boxShadow:'0px 5px 1px 0.1px'}}>
                <Grid xs={12} item >
                    <Typography variant='h3' sx={{fontWeight:'bold'}}>{task.title}</Typography>
                </Grid>
                <Grid xs={12} item >
                    <Typography variant='h6'>{new Date(task.due).toLocaleDateString('en-US', {
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
                                <a href={`/${attachment.filePath}`} download={attachment.orig_path}>
                                    {attachment.orig_path}
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
                    <Grid item xs={12} sx={{backgroundColor:deliverable.has_submission?'rgb(253,204,3)':'rgba(0,0,0,0.1)', padding:'10px', borderRadius:'10px', boxShadow:'0px 1px 3px 0.3px', marginTop:'10px'}}>
                        <Grid container>
                            <form onSubmit={handleSubmit} style={{width:'100%'}}>
                                <Grid container>
                                    <Grid item xs={12} md={8}>
                                        <Stack gap={1}>
                                            <Typography variant='h6'>{deliverable.title}</Typography>
                                            <Divider/>
                                            {submissions
                                            .filter((submission) => submission.deliverableID === deliverable.id)
                                            .map((filteredSubmission) => (
                                                <a href={`/${filteredSubmission.filePath}`} download={filteredSubmission.orig_path}>{filteredSubmission.orig_path}</a>
                                                ))}
                                            {deliverable.has_submission?
                                                <></>
                                                :
                                                <>
                                                    <Typography color="error">No submission yet.</Typography>
                                                    
                                                        <input style={{display:'none'}} type="number" name="deliverableID" value={deliverable.id}/>
                                                        <input style={{display:'none'}} type="number" name="taskID" value={task.id}/>
                                                        <input type='file' name="files" multiple/>
                                                        
                                                    
                                                </>
                                            }
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={4} sx={{display:'flex', alignItems:'center', justifyContent:{sx:"start", md:"center"}}}>
                                        {user.accessType === "Employee"?
                                                !deliverable.has_submission?
                                                    <Button onClick={handleSubmit} type="submit" variant="contained">Submit</Button>
                                                    :
                                                    <Button variant="contained" color="error" type="button" onClick={removeSubmission(deliverable.id)}>Unsubmit</Button>
                                                :
                                                <Stack direction="row" gap={1} sx={{marginTop:'10px'}}>
                                                    <Button variant="contained" color="error">Reject</Button>
                                                    <Button variant="contained" color="warning">Approve</Button>
                                                </Stack>
                                            }
                                    </Grid>
                                </Grid>
                            </form>
                            <Grid item xs={4} sx={{display:'flex',justifyContent:'center', alignItems:'center'}}>
                                
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
                
            </Grid>
        </>
    );
}

export default TaskPage;

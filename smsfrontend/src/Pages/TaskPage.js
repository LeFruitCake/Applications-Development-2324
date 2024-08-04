import React, { useContext, useEffect, useState } from 'react';
import B2DashboardButton from '../Components/b2DashboardButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { UserContext } from '../ContextProvider/UserContext';
import ExcelFile from '../Components/ExcelFile';
import getFileType from '../Functions/getFileType';
import DeliverableCardEmployee from '../Components/DeliverableCardEmployee';
import DeliverableCardAdmin from '../Components/DeliverableCardAdmin';

const TaskPage = () => {
    const {user} = useContext(UserContext);
    const location = useLocation();
    const task = location.state.task;
    const [attachments, setAttachments] = useState([]);
    const [deliverables,setDeliverables] = useState([]);
    const back2dashboardButtonHandler = ()=>{
        window.history.back();
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/Attachments/getAllByTaskID?id=${task.id}`)
          .then(response => {
            setAttachments(response.data)
          })
          .catch(error => {
            console.log(error);
          });

          axios.get(`http://localhost:8080/Deliverables/getAllByTaskID?id=${task.id}`)
          .then(response => {
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
          <Grid container width='70%' margin='0 auto' padding={2} sx={{backgroundColor:'rgba(0,0,0,0.05)', boxShadow:'0px 0px 5px 0.1px', borderRadius:'10px'}}>
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
                {task.instructions?
                    <Typography variant='h6'>Instructions</Typography>
                    :
                    <>
                    </>
                }
              </Grid>
              <Grid item xs={12} sx={{marginTop:'10px', paddingLeft:'10%'}}>
                  <Typography variant='h6'>{task.instructions}</Typography>
              </Grid>
              <Grid item xs={12} sx={{marginTop:'10px'}}>
                  {attachments.length !==0?
                    <Typography variant='h6'>Attachments</Typography>
                    :
                    <></>
                  }
                  {attachments.length !== 0?
                      attachments.map((attachment)=>(
                          <Grid item xs={12}>
                              <ExcelFile file={attachment} color={getFileType(attachment.orig_path)}/>
                          </Grid>
                      )):
                      <></>
                  }
                  <Divider sx={{marginTop:'10px'}}/>
              </Grid>
              <Grid item xs={12} sx={{marginTop:'10px'}}>
                  <Typography variant='h6'>Submissions</Typography>
              </Grid>
              {
                deliverables.length > 0?
                <>
                  {deliverables.map((deliverable, id)=>(
                    <Grid item xs={12} key={id} sx={{marginTop:'10px'}}>
                      {user.accessType === "Admin" || user.accessType === "Head Admin"?
                        <DeliverableCardAdmin deliverable={deliverable}/>
                        :
                        <DeliverableCardEmployee deliverable={deliverable}  />
                      }
                    </Grid>
                  ))}
                </>
                :
                <></>
              }
          </Grid>
        </>
    );
}

export default TaskPage;

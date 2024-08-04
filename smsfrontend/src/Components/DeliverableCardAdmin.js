import { Button, Divider, Grid, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ExcelFile from './ExcelFile';
import getFileType from '../Functions/getFileType';
import axios from 'axios';
import '../static/css/DeliverableContainer.css';





const DeliverableCardAdmin = ({deliverable}) => {
    const [submissions, setSubmissions] = useState([]);
    const [has_submission, setHas_submission] = useState(deliverable.has_submission);
    const [is_approved, setIs_approved] = useState(deliverable.is_approved);
    useEffect(() => {
        axios.get(`http://localhost:8080/submission/GetAllByDeliverableID?id=${deliverable.id}`)
          .then(response => {
            setSubmissions(response.data)
          })
          .catch(error => {
            console.log(error);
          });
      }, []);

    const acceptSubmission = ()=>{
        axios.post(`http://localhost:8080/submission/accept`,null,{
              params:{
                  id:deliverable.id,
              }  
          })
          .then(response => {
            console.log(response)
            setIs_approved(true);
          })
          .catch(error => {
            console.log(error);
          });
    }

    const rejectSubmission = ()=>{
        axios.post(`http://localhost:8080/submission/reject`,null,{
            params:{
                id:deliverable.id,
            }
        })
          .then(response => {
            console.log(has_submission)
            setHas_submission(!has_submission);
            
          })
          .catch(error => {
            console.log(error);
          });
    }

    return (
        <Grid container className='deliverableContainer'>
            <Grid item xs={8}>
                <Stack direction={"column"} >
                    <Typography>{deliverable.title}</Typography>
                    
                    {has_submission?
                        <Stack direction={'column'} gap={1}>
                            <Divider/>
                            {submissions.map((submission,id)=>(
                                <ExcelFile file={submission} color={getFileType(submission.orig_path)}/>
                            ))}
                        </Stack>
                        :
                        <></>
                    }
                </Stack>
            </Grid>
            <Grid item xs={4} textAlign='center' sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                {has_submission?
                    is_approved?
                    <Typography sx={{color:'green', fontWeight:'bold'}}>Approved</Typography>
                    :
                    <Stack direction={"row"} gap={1} >
                        <Button onClick={rejectSubmission} variant='contained' color='error'>Reject</Button>
                        <Button onClick={acceptSubmission} variant='contained' color='warning'>Approve</Button>
                    </Stack>
                    :
                    <Typography color="error" variant='caption' sx={{fontWeight:'bold', fontSize:'15px'}}>No submission yet.</Typography>
                }
            </Grid>
        </Grid>
    );
}

export default DeliverableCardAdmin;

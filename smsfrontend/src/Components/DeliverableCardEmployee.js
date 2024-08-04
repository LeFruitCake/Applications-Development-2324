import { Button, Divider, Grid, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ExcelFile from './ExcelFile';
import getFileType from '../Functions/getFileType';
import axios from 'axios';
import '../static/css/DeliverableContainer.css';





const DeliverableCardEmployee = ({deliverable}) => {
    const [submissions, setSubmissions] = useState([]);
    const [has_submission, setHas_submission] = useState(deliverable.has_submission);
    const [is_approved, setIs_approved] = useState(deliverable.is_approved);
    const handleSubmit = (event) => {
        event.preventDefault();
      
        const formData = new FormData();
        const form = event.currentTarget;
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
            setHas_submission(!has_submission);
          } else {
            console.error('Error submitting the form:', response.status);
          }
        })
        .catch(error => {
          console.error('Error submitting the form:', error);
        });
      };

    const removeSubmission = ()=>{
        axios.post(`http://localhost:8080/submission/remove`,null,{
            params:{
                id:deliverable.id,
            }
        })
        .then(response => {
            setHas_submission(!has_submission)
            console.log(response);
        })
        .catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/submission/GetAllByDeliverableID?id=${deliverable.id}`)
          .then(response => {
            console.log(response.data)
            setSubmissions(response.data)
          })
          .catch(error => {
            console.log(error);
          });
    }, [has_submission]);
    return (
        <form onSubmit={handleSubmit}>
            <Grid container className='deliverableContainer'>
                    <Grid item xs={8}>
                        <Stack direction={"column"} gap={1}>
                            <Typography variant='h5'>{deliverable.title}</Typography>
                            {/* <Divider/> */}
                            <Stack>
                                {submissions.map((submission,id)=>(
                                    <ExcelFile file={submission} color={getFileType(submission.orig_path)}/>
                                ))}
                            </Stack>
                            {has_submission?
                                <></>
                                :
                                <>
                                    <input type='number' value={deliverable.id} name='deliverableID' style={{display:'none'}}/>
                                    <input type='file' multiple name='files'/>
                                </>
                            }
                        </Stack>
                    </Grid>
                    <Grid item xs={4} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                        {is_approved?
                            <Typography sx={{color:'green', fontWeight:'bold'}}>Approved</Typography>
                            :
                            !has_submission?
                            <Button type='submit' variant='contained'>Submit</Button>
                            :
                            <Button onClick={removeSubmission} type='button' variant='contained' color='error'>Unsubmit</Button>
                        }
                    </Grid>
                
            </Grid>
        </form>
    );
}

export default DeliverableCardEmployee;

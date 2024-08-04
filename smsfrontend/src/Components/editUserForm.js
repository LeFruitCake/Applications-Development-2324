import React, { useContext, useState } from 'react';
import { Alert, Button, Grid, Stack, Typography } from '@mui/material';
import { companyContext } from '../Pages/Dashboard';
import ProfileAvatar from './ProfileAvatar';
import axios from 'axios';

const EditUserForm = ({user}) => {
    const {companies} = useContext(companyContext);
    const [isEmployee, setIs_Employee] = useState(user.accessType === "Employee"?true:false)
    const [alert,setAlert] = useState(false);

    const saveChanges = (event) => {
        event.preventDefault(); // Add this line
      
        const editUserRequest = {
          userID: user.id,
          accessType: document.querySelector(`select[name="accessType"]`).value,
          companyID: isEmployee? document.querySelector(`select[name="companyID"]`).value : 0,
        };
      
        axios.post('http://localhost:8080/User/save', editUserRequest, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
            console.log(response.data);
            setAlert(true);
            setTimeout(() => {
                setAlert(false)
            }, 5000);
          })
        .catch((error) => {
            console.error(error);
            // Handle error response
          });
      };
    return (
        <Grid container>
            <Grid item xs={6} sx={{display:'flex', alignItems:'center'}}>
                <Stack direction={'row'} sx={{alignItems:'center'}} gap={3}>
                    {user.profilePhoto?
                        <img src={user.pPhoto} alt='pPhoto' style={{width:'100px', height:'100px', borderRadius:'50%'}}/>
                        :
                        <ProfileAvatar size="60px"/>
                    }
                    <Typography variant='button' sx={{fontWeight:'bold'}}>{user.username}</Typography>
                </Stack>
            </Grid>
            <Grid item xs={6} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <form onSubmit={saveChanges}>
                    <Stack direction={'row'} gap={3} >
                        <select onChange={(e)=>{if(e.target.value==="Employee"){setIs_Employee(true)}else{setIs_Employee(false)}}} name='accessType' defaultValue={user.accessType}>
                            <option value="Guest">Guest</option>
                            <option value="Employee">Employee</option>
                            <option value="Admin">Admin</option>
                            <option value="Head Admin">Head Admin</option>
                        </select>
                        <select style={{display:isEmployee?'block':'none'}} name='companyID' defaultValue={user.companyID}>
                            {companies.map((company) => (
                                <option value={company.id}>{company.name}</option>
                            ))}
                            <option value={"None"}>None</option>    
                        </select>
                        <input type='number' value={user.id} style={{display:'none'}}/>
                        <Button type='submit' color='warning' variant='contained'>Save</Button>
                    </Stack>
                </form>
            </Grid>
            <Alert sx={{position:'fixed',display:alert?'flex':'none',alignSelf:'end', bottom:30,right:30, fontSize:'20px', alignItems:'center'}} severity='success'>Changes for user saved.</Alert>
        </Grid>
    );
}

export default EditUserForm;

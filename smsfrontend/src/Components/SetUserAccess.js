import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import EditUserForm from './editUserForm';

const SetUserAccess = () => {
    
    const [users, setUsers] = useState([
    ]);

    useEffect(() => {
        axios.get("http://localhost:8080/User/findAll")
        .then((response)=>{
            console.log(response.data)
            setUsers(response.data);
        })
        .catch((error)=>{
            console.log(error)
        })
    }, []);
    return (
       <Grid container gap={3}>
            {users.map((user)=>(
                <Grid item xs={12}>
                    <EditUserForm user={user}/>
                </Grid>
            ))}
       </Grid> 
    );
}

export default SetUserAccess;

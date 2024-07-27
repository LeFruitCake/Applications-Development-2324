import { Button, Grid, Stack, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { companyContext } from '../Pages/Dashboard';

const SetUserAccess = () => {
    const {companies} = useContext(companyContext);
    const [users, setUsers] = useState([
        {
            'name':'Jandel Macabecha',
            'pPhoto':'/2.png',
            'accessType':'Guest',
            'company':'None',
        },
        {
            'name':'Angeline Damao',
            'pPhoto':'/3.png',
            'accessType':'Employee',
            'company':'Codechum',
        }
        
    ]);
    return (
       <Grid container gap={3}>
            {users.map((user)=>(
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={6} sx={{display:'flex', alignItems:'center'}}>
                            <Stack direction={'row'} sx={{alignItems:'center'}} gap={3}>
                                <img src={user.pPhoto} alt='pPhoto' style={{width:'100px', height:'100px', borderRadius:'50%'}}/>
                                <Typography variant='button' sx={{fontWeight:'bold'}}>{user.name}</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={6} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <Stack direction={'row'} gap={3} >
                                <select name='aType' defaultValue={user.accessType}>
                                    <option value="Guest">Guest</option>
                                    <option value="Employee">Employee</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Head Admin">Head Admin</option>
                                </select>
                                <select defaultValue={user.company}>
                                    {companies.map((company)=>(
                                        <option value={company.companyName}>{company.companyName}</option>
                                    ))}
                                    <option value="None" selected>None</option>
                                </select>
                                <Button color='warning' variant='contained'>Save</Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
            ))}
       </Grid> 
    );
}

export default SetUserAccess;

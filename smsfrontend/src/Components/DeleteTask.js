import { IconButton } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
const DeleteTask = () => {
    return (
        <IconButton sx={{backgroundColor:'yellow', '&:hover':{backgroundColor:'rgba(253,204,3,1)'}}}>
            <DeleteIcon color='black'></DeleteIcon>
        </IconButton>
    );
}

export default DeleteTask;

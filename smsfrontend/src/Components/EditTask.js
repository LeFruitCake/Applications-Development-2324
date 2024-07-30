import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton, Stack, TextField } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import '../static/css/CreateTaskModal.css'
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  maxHeight:'500px',
  overflow:'auto',
};



const EditTask = ({task,reloader,setReloader}) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dueDate = new Date(task.due);
    const formattedDueDate = `${dueDate.getFullYear()}-${String(dueDate.getMonth() + 1).padStart(2, '0')}-${String(dueDate.getDate()).padStart(2, '0')}`;
    const today = new Date();
    const minDate = today.toLocaleDateString('en-CA');
    
    console.log(task)

    const handleSubmit = (event)=>{
        event.preventDefault();
        axios.post("http://localhost:8080/StartupProfile/editTask",event.target)
        .then(response =>{
            console.log(response)
            setReloader(!reloader)
            handleClose();
        })
        .catch(error=>{
            console.log(error)
        })
    }

    return (
        
        <>
            <IconButton onClick={handleOpen} sx={{backgroundColor:'yellow', '&:hover':{backgroundColor:'rgba(253,204,3,1)'}}}>
                <EditIcon></EditIcon>
            </IconButton>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={'center'}>
                Edit {task.title}
            </Typography>
            <form onSubmit={handleSubmit} >
                <Stack direction={'column'} gap={2}>
                    <TextField name='title' className='inputTextField' placeholder='Task Title' defaultValue={task.title}></TextField>
                    <TextField name='instructions' className='inputTextField' rows={4} multiline placeholder='Instructions' defaultValue={task.instructions}></TextField>
                    <TextField name='due' inputProps={{min:minDate}} className='inputTextField' placeholder='Due Date' type='date' defaultValue={formattedDueDate}></TextField>
                    <TextField name='id' type='number' value={task.id} sx={{display:'none'}}/>
                    <Stack direction={'row'} gap={2} alignSelf={'end'}>
                        <Button onClick={handleClose} variant='contained' sx={{backgroundColor:'silver', color:'black','&:hover':{backgroundColor:'rgba(0,0,0,0.5)'}}} type='button'>Close</Button>
                        <Button variant='contained' type='submit'>Submit</Button>
                    </Stack>
                </Stack>
            </form>
            </Box>
        </Modal>
        </>
    );
}

export default EditTask;

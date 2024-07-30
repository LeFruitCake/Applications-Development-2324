import { Button, IconButton, Stack } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 250,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  textAlign:'center'
};
const DeleteTask = ({id, reloader, setReloader}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const deleteTask = ()=>{
        axios.post("http://localhost:8080/StartupProfile/deleteTask", null, {
            params: {
                id: id
            }
        })
        .then(response =>{
            console.log(response)
            setReloader(!reloader);
            handleClose();
        })
        .catch(error=>{
            console.log(error)
        })
    }

    return (
        <>
            <IconButton onClick={handleOpen} sx={{backgroundColor:'yellow', '&:hover':{backgroundColor:'rgba(253,204,3,1)'}}}>
                <DeleteIcon color='black'></DeleteIcon>
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                    Confirm delete?
                </Typography>
                <Stack direction={"row"} sx={{marginTop:'15px', display:'flex', justifyContent:'space-between'}}>
                    <Button onClick={handleClose} variant='contained'>Cancel</Button>
                    <Button onClick={deleteTask} variant='contained' color='error'>Delete</Button>
                </Stack>
                </Box>
            </Modal>
        </>
    );
}

export default DeleteTask;

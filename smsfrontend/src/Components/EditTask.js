import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton, Stack, TextField } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import '../static/css/CreateTaskModal.css'
import CancelIcon from '@mui/icons-material/Cancel';

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



const EditTask = ({task}) => {

    const [visible,setVisible] = React.useState(false)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [deliverables,setDeliverables] = React.useState([]);

    const addDeliverableHandler = ()=>{
        setVisible(!visible);
    }

    const saveDeliverable = ()=>{
        if(document.getElementById("deliverableTF").value){
            let temp = [...deliverables];
            temp.push(document.getElementById("deliverableTF").value)
            document.getElementById("deliverableTF").value = ""
            setDeliverables([...temp])
        }
        
    }

    const removeDeliverable = (key)=>{
        let temp = [...deliverables];
        temp.splice(key,1);
        setDeliverables([...temp]);
    }
    console.log(task)
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
                Task Creation
            </Typography>
            <form >
                <Stack direction={'column'} gap={2}>
                    <TextField className='inputTextField' placeholder='Task Title' value={task.title}></TextField>
                    <TextField className='inputTextField' rows={4} multiline placeholder='Instructions' value={task.description}></TextField>
                    <TextField className='inputTextField' placeholder='Due Date' type='date' value={task.dueDate}></TextField>
                    <Box sx={{display:'flex',justifyContent:'space-between'}}>
                        <Typography>Deliverables</Typography>
                        <IconButton onClick={addDeliverableHandler}><AddCircleIcon/></IconButton>
                    </Box>
                    <TextField id='deliverableTF' className='inputTextField' sx={{display:visible?'flex':'none', width:'100%'}}></TextField>
                    <Stack direction={'row'} gap={2} sx={{display:visible?'flex':'none', justifyContent:'end'}}>
                        <Button onClick={addDeliverableHandler} size='small' variant='contained' sx={{backgroundColor:'red','&:hover':{backgroundColor:'rgba(255,0,0,0.8)'}}}>Cancel</Button>
                        <Button onClick={saveDeliverable} size='small' variant='contained'>Save</Button>
                    </Stack>
                    <Stack gap={1}>
                        {deliverables.map((deliverable, key)=>(
                            <Box key={key} sx={{backgroundColor:'rgb(253,204,3)', padding:'15px', borderRadius:'3px', display:'flex',justifyContent:'space-between', alignItems:'center'}}>
                                <Typography>{deliverable}</Typography>
                                <IconButton onClick={()=>removeDeliverable(key)}><CancelIcon color='error'/></IconButton>
                            </Box>
                        ))}
                    </Stack>
                    <Typography>Attachments</Typography>
                    <input type='file' multiple/>
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

import * as React from 'react';
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

export default function CreateTaskModal({id, reloader, setReloader}) {
    const [visible,setVisible] = React.useState(false)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [deliverables,setDeliverables] = React.useState([]);
    const today = new Date();
    const minDate = today.toLocaleDateString('en-CA');
    const [flag,setFlag] = React.useState(false);

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
    
    const handleSubmit = (event) => {
        
        event.preventDefault(); // prevent default form submission
        
        if(deliverables.length === 0){
            setVisible(true)
            setFlag(true)
        }else{
            const form = document.getElementById("myForm");
            const formData = new FormData(event.target);
            axios.post('http://localhost:8080/StartupProfile/createTask', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              })
               .then((response) => {
                  if(response.status === 200){
                      form.reset();
                      setDeliverables([]);
                      handleClose();
                      setReloader(!reloader);
                  }else{
                  }
                  console.log(response.data);
                })
               .catch((error) => {
                  console.error(error);
                });
        }
    };

    return (
        <div>
        <Button onClick={handleOpen} size='large' sx={{backgroundColor:'black',color:'rgb(253,204,3)',paddingLeft:'20px',paddingRight:'20px',fontWeight:'bold','&:hover':{backgroundColor:'rgba(0,0,0,0.8)'}}}>Load</Button>
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
                <form id='myForm' onSubmit={handleSubmit} encType='multipart/form-data'>
                    <Stack direction={'column'} gap={2}>
                        <TextField required className='inputTextField' name='title' placeholder='Task Title'></TextField>
                        <TextField className='inputTextField' name='instructions' rows={4} multiline placeholder='Instructions'></TextField>
                        <TextField required inputProps={{min:minDate}} className='inputTextField' name='due' placeholder='Due Date' type='date'></TextField>
                        <Box sx={{display:'flex',justifyContent:'space-between'}}>
                            <Typography>Deliverables</Typography>
                            <IconButton onClick={addDeliverableHandler}><AddCircleIcon/></IconButton>
                        </Box>
                        <TextField error={flag} helperText={"Task must contain atleast one deliverable."} id='deliverableTF' className='inputTextField' onClick={()=>{setFlag(false)}} sx={{display:visible?'flex':'none', width:'100%'}}></TextField>
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
                        <input style={{display:'none'}} name='companyID' type='number' value={id}/>
                        <input id='myDel' style={{display:'none'}} name='deliverables' value={deliverables}/>
                        </Stack>
                        <Typography>Attachments</Typography>
                        <input name='attachments' type='file' multiple/>
                        <Stack direction={'row'} gap={2} alignSelf={'end'}>
                            <Button onClick={handleClose} variant='contained' sx={{backgroundColor:'silver', color:'black','&:hover':{backgroundColor:'rgba(0,0,0,0.5)'}}} type='button'>Close</Button>
                            <Button variant='contained' type='submit'>Submit</Button>
                        </Stack>
                    </Stack>
                </form>
            </Box>
        </Modal>
        </div>
  );
}

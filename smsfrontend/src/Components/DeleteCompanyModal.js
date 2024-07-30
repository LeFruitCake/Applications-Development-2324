import React, { useContext, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import axios from 'axios';
import { companyContext } from '../Pages/Dashboard';

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
  textAlign:'center',
};

const DeleteCompanyModal = ({companyName, id, setFlag}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {setOpen(false); setMatch(true)};
    const [match,setMatch] = useState(true);

    const {companies, setCompanies} = useContext(companyContext);


    const deleteCompany = ()=>{
        axios.post("http://localhost:8080/company/delete",{
            "id":id,
        })
        .then(response=>{
            console.log(response);
            updateCompanies();
            handleClose();
            setFlag(true);
            setTimeout(() => {
                setFlag(false);
            }, 5000);
        })
        .catch(error=>{
            console.log(error)
        })
    }

    const updateCompanies = () => {
        const updatedCompanies = companies.filter((company) => company.id !== id);
        setCompanies(updatedCompanies);
    };

    return (
        <div>
            <Button onClick={handleOpen} variant='contained' size='small' color='error'>Delete</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                backdrop: {
                    timeout: 500,
                },
                }}
            >
                <Fade in={open}>
                <Box sx={style}>
                    <Typography id="transition-modal-title" variant="h4" component="h2">
                        {companyName}
                    </Typography>
                    <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                        <TextField onChange={(e)=>{if(e.target.value == companyName){setMatch(false)}else{setMatch(true)}}} sx={{width:'100%'}} placeholder='Please type the company name to delete.' variant='outlined'/>
                    </Typography>
                    <Button onClick={deleteCompany} sx={{marginTop:2}} size='large' disabled={match} color='error' variant='contained'>Proceed</Button>
                </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default DeleteCompanyModal;

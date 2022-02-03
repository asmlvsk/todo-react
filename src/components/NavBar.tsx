import React, { FC, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Modal } from '@mui/material';
import ModalForm from './Auth/ModalForm';
import { IUserBody } from '../interfaces/interfaces';

interface IProps {
  signUpUser: (userBody: IUserBody) => void;
}

const NavBar: FC<IProps> = function ({ signUpUser }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box sx={{ flexGrow: 1, marginBottom: '20px' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TODO
          </Typography>
          <Button onClick={handleOpen} color="inherit">
            Login
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ModalForm handleClose={handleClose} signUpUser={signUpUser} />
          </Modal>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;

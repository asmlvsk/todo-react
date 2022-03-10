import React, { FC, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton, Modal } from '@mui/material';
import { Link } from 'react-router-dom';
import ModalForm from './Auth/ModalForm';
import { IUserBody, IUserLoginBody } from '../interfaces/interfaces';

interface IProps {
  signUpUser: (userBody: IUserBody) => void;
  signInUser: (userBody: IUserLoginBody) => void;
  logOutUserHandler: () => void;
  userName: string | null;
}

const NavBar: FC<IProps> = function ({
  signUpUser,
  signInUser,
  logOutUserHandler,
  userName,
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ flexGrow: 1, marginBottom: '20px' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">TODO</Link>
          </Typography>
          {!userName ? (
            <Button onClick={handleOpen} color="inherit">
              Login
            </Button>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '3rem',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Welcome, <Link to="/profile">{userName}</Link>
              </Typography>
              <IconButton onClick={logOutUserHandler}>
                <LogoutIcon color="inherit" />
              </IconButton>
            </div>
          )}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box>
              <ModalForm
                handleClose={handleClose}
                signUpUser={signUpUser}
                signInUser={signInUser}
              />
            </Box>
          </Modal>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;

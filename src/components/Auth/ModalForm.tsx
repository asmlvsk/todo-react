import { Box, Button, TextField, Typography } from '@mui/material';
import './ModalForm.css';
import React, { FC, useState } from 'react';

const style = {
  // eslint-disable-next-line @typescript-eslint/prefer-as-const
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

type IProps = {
  handleClose: () => void;
};

const ModalForm: FC<IProps> = function ({ handleClose }) {
  const [isSignIn, setIsSignIn] = useState(false);
  return (
    <Box sx={style}>
      <form className="formBody">
        <Typography variant="h5" gutterBottom component="div">
          Sign Up
        </Typography>
        <TextField label="Name" variant="filled" />
        <TextField label="Email" variant="filled" type="email" />
        <TextField label="Password" variant="filled" type="password" />
        <div className="buttonArea">
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Signup
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default ModalForm;

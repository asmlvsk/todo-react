import { Box, Button } from '@mui/material';
import './ModalForm.css';
import React, { FC, useState } from 'react';
import { IUser, IUserBody, IUserLoginBody } from '../../interfaces/interfaces';
import Login from './Login';
import SignUp from './SignUp';

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
  signUpUser: (userBody: IUserBody) => void;
  signInUser: (userBody: IUserLoginBody) => void;
};

const ModalForm: FC<IProps> = function ({
  handleClose,
  signUpUser,
  signInUser,
}) {
  const [isSignIn, setIsSignIn] = useState(false);
  return (
    <Box sx={style}>
      {isSignIn ? (
        <div className="container">
          <Login handleClose={handleClose} signInUser={signInUser} />
          <Button variant="contained" onClick={() => setIsSignIn(!isSignIn)}>
            Sign Up
          </Button>
        </div>
      ) : (
        <div className="container">
          <SignUp handleClose={handleClose} signUpUser={signUpUser} />
          <Button variant="contained" onClick={() => setIsSignIn(!isSignIn)}>
            Sign In
          </Button>
        </div>
      )}
    </Box>
  );
};

export default ModalForm;

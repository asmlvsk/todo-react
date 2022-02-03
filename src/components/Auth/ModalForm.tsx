import { Box, Button, TextField, Typography } from '@mui/material';
import './ModalForm.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { FC, useState } from 'react';
import { IUser, IUserBody } from '../../interfaces/interfaces';
import userSchema from '../../schemas/userSchema';

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
};

const ModalForm: FC<IProps> = function ({ handleClose, signUpUser }) {
  const [isSignIn, setIsSignIn] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUserBody>({
    resolver: yupResolver(userSchema),
  });

  const onSubmit = (user: IUserBody) => {
    const newUser: IUserBody = {
      name: user.name,
      email: user.email,
      password: user.password,
    };

    signUpUser(newUser);
    reset(user);
  };

  return (
    <Box sx={style}>
      <form className="formBody" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5" gutterBottom component="div">
          Sign Up
        </Typography>
        <TextField label="Name" variant="filled" {...register('name')} />
        <div className="invalid-feedback">{errors.name?.message}</div>
        <TextField
          label="Email"
          variant="filled"
          type="email"
          {...register('email')}
        />
        <div className="invalid-feedback">{errors.email?.message}</div>
        <TextField
          label="Password"
          variant="filled"
          type="password"
          {...register('password')}
        />
        <div className="invalid-feedback">{errors.password?.message}</div>
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

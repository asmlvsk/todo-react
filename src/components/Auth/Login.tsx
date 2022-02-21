import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { IUserLoginBody } from '../../interfaces/interfaces';
import { loginSchema } from '../../schemas/userSchema';

type IProps = {
  handleClose: () => void;
  signInUser: (userBody: IUserLoginBody) => void;
};

const Login: FC<IProps> = function ({ handleClose, signInUser }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserLoginBody>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (user: IUserLoginBody) => {
    const newUser: IUserLoginBody = {
      email: user.email,
      password: user.password,
    };

    signInUser(newUser);
    // reset(user);
    handleClose();
  };

  return (
    <form className="formBody" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" gutterBottom component="div">
        Sign In
      </Typography>
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
        <Button type="submit" variant="contained" color="secondary">
          Sign In
        </Button>
      </div>
    </form>
  );
};

export default Login;

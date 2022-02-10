import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { IUserBody } from '../../interfaces/interfaces';
import { regSchema } from '../../schemas/userSchema';

type IProps = {
  handleClose: () => void;
  signUpUser: (userBody: IUserBody) => void;
};

const SignUp: FC<IProps> = function ({ handleClose, signUpUser }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUserBody>({
    resolver: yupResolver(regSchema),
  });

  const onSubmit = (user: IUserBody) => {
    const newUser: IUserBody = {
      name: user.name,
      email: user.email,
      password: user.password,
      passwordConfirmation: user.passwordConfirmation,
    };

    signUpUser(newUser);
    // reset(user);
    handleClose();
  };

  <Navigate to="/" />;

  return (
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
      <TextField
        label="Confirm Password"
        variant="filled"
        type="password"
        {...register('passwordConfirmation')}
      />
      <div className="invalid-feedback">
        {errors.passwordConfirmation?.message}
      </div>
      <div className="buttonArea">
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="secondary">
          Signup
        </Button>
      </div>
    </form>
  );
};

export default SignUp;

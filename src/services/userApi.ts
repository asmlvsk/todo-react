import { IUserBody, IUserLoginBody } from '../interfaces/interfaces';
import API from './api';

export const loggedIn = async () =>
  API.get('/logged_in', {
    withCredentials: true,
  })
    .then((res) => ({
      error: null,
      data: res.data,
    }))
    .catch((error) => ({
      error: error?.response?.data?.error,
      data: {},
    }));

export const signUpUser = async (userBody: IUserBody) =>
  API.post('/registrations', {
    withCredentials: true,
    user: userBody,
  })
    .then((res) => ({
      error: null,
      data: res.data,
    }))
    .catch((error) => ({
      error: error?.response?.data?.error,
      data: {},
    }));

export const signInUser = async (userBody: IUserLoginBody) =>
  API.post('/sessions', {
    withCredentials: true,
    user: userBody,
  })
    .then((res) => ({
      error: null,
      data: res.data,
    }))
    .catch((error) => ({
      error: error?.response?.data?.error,
      data: {},
    }));

export const logoutUser = async () =>
  API.delete('/logout', {
    withCredentials: true,
  })
    .then((res) => ({
      error: null,
      data: res.data,
    }))
    .catch((error) => ({
      error: error?.response?.data?.error,
      data: {},
    }));

export const updateUserAvatar = async (id: number, avatar: string) =>
  API.patch(`/sessions/${id}`, {
    withCredentials: true,
    avatar,
  })
    .then((res) => ({
      error: null,
      data: res.data,
    }))
    .catch((error) => ({
      error: error?.response?.data?.error,
      data: {},
    }));

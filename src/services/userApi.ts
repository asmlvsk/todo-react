import { IUserBody } from '../interfaces/interfaces';
import API from './api';

export const findUser = async (id: number) =>
  API.get(`/users/${id}`)
    .then((res) => ({
      error: null,
      data: res.data,
    }))
    .catch((error) => ({
      error: error?.response?.data?.error,
      data: {},
    }));

export const signUpUser = async (user: IUserBody) =>
  API.post('/users', {
    user,
  })
    .then((res) => ({
      error: null,
      data: res.data,
    }))
    .catch((error) => ({
      error: error?.response?.data?.error,
      data: {},
    }));

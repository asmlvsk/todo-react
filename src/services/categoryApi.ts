import { ITodo } from '../interfaces/interfaces';
import API from './api';

const fetchCategories = async () =>
  API.get('/categories')
    .then((res) => ({
      error: null,
      data: res.data,
    }))
    .catch((error) => ({
      error: error?.response?.data?.error,
      data: {},
    }));

export default fetchCategories;

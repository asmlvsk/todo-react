import { ICategory, ITodo } from '../interfaces/interfaces';
import API from './api';

export const fetchTodos = async () =>
  API.get('/tasks')
    .then((res) => ({
      error: null,
      data: res.data,
    }))
    .catch((error) => ({
      error: error?.response?.data?.error,
      data: {},
    }));

export const postTodo = async (todo: ITodo) =>
  API.post('/tasks', {
    task: todo,
  })
    .then((res) => ({
      error: null,
      data: res.data,
    }))
    .catch((error) => ({
      error: error?.response?.data?.error,
      data: {},
    }));

export const updateTodo = async (id: number, todo: ITodo) =>
  API.patch(`/tasks/${id}`, {
    task: todo,
  })
    .then((res) => ({
      error: null,
      data: res.data,
    }))
    .catch((error) => ({
      error: error?.response?.data?.error,
      data: {},
    }));

export const updateTodoStatus = async (id: number, status: boolean) =>
  API.patch(`/tasks/${id}`, {
    is_done: status,
  })
    .then((res) => ({
      error: null,
      data: res.data,
    }))
    .catch((error) => ({
      error: error?.response?.data?.error,
      data: {},
    }));

export const updateTodoCategory = async (id: number, categoryId: number) =>
  API.patch(`/tasks/${id}/add_category`, {
    data: categoryId,
  })
    .then((res) => ({
      error: null,
      data: res.data,
    }))
    .catch((error) => ({
      error: error?.response?.data?.error,
      data: {},
    }));

export const removeTodoById = async (id: number) =>
  API.delete(`/tasks/${id}`)
    .then((res) => ({
      error: null,
      data: res.data,
    }))
    .catch((error) => ({
      error: error?.response?.data?.error,
      data: {},
    }));

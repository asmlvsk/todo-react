import React, { useEffect, useState } from 'react';
import './App.css';
import { Grid, Paper } from '@mui/material';
import { ITodos, ITodo, IUserBody } from './interfaces/interfaces';
import ListItem from './components/ListItem';
import AddTodoForm from './components/AddTodoForm';
import NavBar from './components/NavBar';
import {
  fetchTodos,
  postTodo,
  removeTodoById,
  updateTodo,
  updateTodoStatus,
} from './services/todosApi';
import { signUpUser } from './services/userApi';

function App(this: any) {
  const [todos, setTodos] = useState<ITodos[]>([]);

  useEffect(() => {
    const getAllTodos = async () => {
      const { data, error } = await fetchTodos();
      setTodos(data.data);
    };
    getAllTodos();
  }, []);

  const postTodosHandler = async (todo: ITodo) => {
    const { data, error } = await postTodo(todo);
    setTodos([...todos, data.data]);
  };

  const updateTodoHandler = async (id: number, todo: ITodo) => {
    const { data, error } = await updateTodo(id, todo);
    setTodos(todos.map((item) => (item.id === id ? { ...data.data } : item)));
  };

  const deleteTodoHandler = async (id: number) => {
    const { data, error } = await removeTodoById(id);
    setTodos(todos.filter((t: ITodos) => t.id !== id));
  };

  const updateTodoStatusHandler = async (id: number, isDone: boolean) => {
    const { data, error } = await updateTodoStatus(id, isDone);
    setTodos(todos.map((item) => (item.id === id ? { ...data.data } : item)));
  };

  const postUserHandler = async (userBody: IUserBody) => {
    const { data, error } = await signUpUser(userBody);
  };

  return (
    <div className="App">
      <NavBar signUpUser={postUserHandler} />
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Paper
            sx={{
              padding: '20px',
              margin: 'auto',
              textAlign: 'center',
              maxWidth: 500,
            }}
          >
            <AddTodoForm addToList={postTodosHandler} />
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            padding: '20px',
            margin: 'auto',
            textAlign: 'center',
            width: 500,
          }}
        >
          {todos.map((todo: ITodos) => (
            <ListItem
              removeFromList={deleteTodoHandler}
              updateTodo={updateTodoHandler}
              updateTodoIsDone={updateTodoStatusHandler}
              todo={todo}
              key={todo.id}
            />
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

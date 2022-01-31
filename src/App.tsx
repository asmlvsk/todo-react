/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable no-debugger */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { Grid, Paper } from '@mui/material';
import { ITodos, ITodo } from './interfaces/interfaces';
import ListItem from './components/ListItem';
import AddTodoForm from './components/AddTodoForm';
import { API } from './services/api';
import NavBar from './components/NavBar';

function App(this: any) {
  const [todos, setTodos] = useState<ITodos[]>([]);

  async function fetchTodos() {
    try {
      const res = await API.get('/tasks');

      setTodos(res.data.data);
    } catch (e) {
      console.log(e);
    }
  }

  async function postTodos(todo: ITodo) {
    try {
      const res = await API.post('/tasks', {
        task: todo,
      });
      setTodos([...todos, res.data.data]);
    } catch (e) {
      console.log(e);
    }
  }

  async function updateTodo(id: number, todo: ITodo) {
    try {
      const res = await API.patch(`/tasks/${id}`, {
        task: todo,
      });

      setTodos(
        todos.map((item) => (item.id === id ? { ...res.data.data } : item))
      );
    } catch (e) {
      console.log(e);
    }
  }

  async function removeTodoById(id: number) {
    try {
      const res = await API.delete(`/tasks/${id}`);
      setTodos(todos.filter((t: ITodos) => t.id !== id));
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  console.log(todos);

  return (
    <div className="App">
      <NavBar />
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
            <AddTodoForm addToList={postTodos} />
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
              removeFromList={removeTodoById}
              updateTodo={updateTodo}
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

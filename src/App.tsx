/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState, CSSProperties } from 'react';
import axios from 'axios';
import './App.css';
import { Grid, Paper } from '@mui/material';
import { ITodos } from './types/types';
import ListItem from './components/ListItem';
import List from './components/List';
import AddTodoForm from './components/AddTodoForm';

function App(this: any) {
  const [todos, setTodos] = useState<ITodos[]>([]);

  async function fetchTodos() {
    try {
      const res = await axios.get('http://localhost:4000/tasks');

      setTodos(res.data.data);
    } catch (e) {
      console.log(e);
    }
  }

  async function postTodos(todo: ITodos) {
    try {
      const res = await axios.post('http://localhost:4000/tasks', todo);

      setTodos(res.data.data);
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
      <div>Items</div>
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
          <List
            items={todos}
            renderItem={(todo: ITodos) => (
              <ListItem todo={todo} key={todo.id} />
            )}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

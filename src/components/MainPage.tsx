import React, { FC, useEffect, useState } from 'react';
import './MainPage.css';
import { Grid, Paper, Typography } from '@mui/material';
import ListItem from './ListItem';
import { ITodo, ITodos } from '../interfaces/interfaces';
import AddTodoForm from './AddTodoForm';
import { loggedIn } from '../services/userApi';

type Props = {
  todos: ITodos[];
  postTodosHandler: (todo: ITodo) => void;
  updateTodoHandler: (id: number, todo: ITodo) => void;
  deleteTodoHandler: (id: number) => void;
  updateTodoStatusHandler: (id: number, isDone: boolean) => void;
  isLogged: boolean;
};

const MainPage: FC<Props> = function ({
  todos,
  postTodosHandler,
  updateTodoHandler,
  deleteTodoHandler,
  updateTodoStatusHandler,
  isLogged,
}) {
  return (
    <div>
      {isLogged ? (
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
      ) : (
        <div className="unregisterPage">
          <Typography color="primary" variant="h3" gutterBottom component="div">
            Please, Log In or Sign Up
          </Typography>
        </div>
      )}
    </div>
  );
};

export default MainPage;

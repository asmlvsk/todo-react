import React, { FC } from 'react';
import './MainPage.css';
import { Grid, Paper, Typography } from '@mui/material';
import ListItem from './ListItem';
import { ICategory, ITodo, IKeyValue, ITodos } from '../interfaces/interfaces';
import AddTodoForm from './AddTodoForm';

type Props = {
  todos: ITodos[];
  categories: ICategory[];
  isLogged: boolean;
  postTodosHandler: (todo: ITodo) => void;
  updateTodoHandler: (id: number, todo: ITodo) => void;
  deleteTodoHandler: (id: number) => void;
  updateTodoStatusHandler: (id: number, isDone: boolean) => void;
  updateCategoryInTask: (id: number, categoryId: IKeyValue[]) => void;
};

const MainPage: FC<Props> = function ({
  todos,
  categories,
  isLogged,
  postTodosHandler,
  updateTodoHandler,
  deleteTodoHandler,
  updateTodoStatusHandler,
  updateCategoryInTask,
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
                updateCategoryInTask={updateCategoryInTask}
                todo={todo}
                key={todo.id}
                categories={categories}
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

/* eslint-disable no-nested-ternary */
import React, { FC, useState } from 'react';
import { Build, Delete } from '@mui/icons-material';
import SaveIcon from '@mui/icons-material/Save';
import { Grid, IconButton, Input, Paper } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { ITodo, ITodos } from '../interfaces/interfaces';

interface ItemProps {
  todo: ITodos;
  removeFromList: (id: number) => void;
  updateTodo: (id: number, todo: ITodo) => void;
  updateTodoIsDone: (id: number, done: boolean) => void;
}
const ListItem: FC<ItemProps> = function ({
  todo,
  removeFromList,
  updateTodo,
  updateTodoIsDone,
}) {
  const [fade, setFade] = useState(false);

  const [toggle, setToggle] = useState(false);
  const [upText, setUpText] = useState('');
  const [upInput, setUpInput] = useState('');
  const [isDone, setIsDone] = useState(todo.attributes.is_done);

  const toggleUpdateInput = (item: ITodos) => (event: React.MouseEvent) => {
    event.preventDefault();
    setUpText(item.attributes.title);
    setToggle(true);
    const newTodo: ITodo = {
      title: upInput,
      body: '',
      is_done: false,
    };
    /// Send Updated Item
    if (toggle) {
      if (upInput !== '') {
        updateTodo(item.id, newTodo);
      }
      setUpInput('');
      setToggle(false);
    }
  };

  const toggleIsDone = (item: ITodos) => () => {
    updateTodoIsDone(item.id, !isDone);
  };

  const deleteTodo = (id: number) => {
    setFade(true);

    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 500);
    });

    promise.then(() => removeFromList(id));
  };

  const gridClass = fade ? 'fade-out' : '';

  return (
    <div>
      <Grid xs={12} className={`${gridClass}`} item key={todo.id}>
        <Paper
          elevation={2}
          sx={{
            margin: 'auto',
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            marginTop: 10,
            width: 500,
          }}
        >
          <Checkbox defaultChecked={isDone} onChange={toggleIsDone(todo)} />
          {!toggle ? (
            <span
              style={{
                margin: 'auto',
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                marginTop: 10,
                width: 500,
              }}
            >
              {todo.attributes.title}
            </span>
          ) : todo.attributes.title === upText ? (
            <Input
              style={{ width: '90%' }}
              defaultValue={todo.attributes.title}
              onChange={(e) => setUpInput(e.target.value)}
            />
          ) : (
            <span
              style={{
                margin: 'auto',
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                marginTop: 10,
                width: 500,
              }}
            >
              {todo.attributes.title}
            </span>
          )}

          <IconButton
            color="primary"
            aria-label="Edit"
            sx={{ marginLeft: 'auto' }}
            onClick={toggleUpdateInput(todo)}
          >
            {!toggle ? (
              <Build fontSize="small" />
            ) : todo.attributes.title === upText ? (
              <SaveIcon fontSize="small" />
            ) : (
              <Build fontSize="small" />
            )}
          </IconButton>
          <IconButton
            color="secondary"
            aria-label="Delete"
            onClick={() => deleteTodo(todo.id)}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Paper>
      </Grid>
    </div>
  );
};

export default ListItem;

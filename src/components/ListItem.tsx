import React, { FC, useState } from 'react';
import { Build, Delete } from '@mui/icons-material';
import { Grid, IconButton, Paper } from '@mui/material';
import axios from 'axios';
import { ITodo, ITodos } from '../types/types';

interface ItemProps {
  todo: ITodos;
  removeFromList: (id: number) => void;
}
const ListItem: FC<ItemProps> = function ({ todo, removeFromList }) {
  const [fade, setFade] = useState(false);

  const deleteTodo = (id: number) => {
    setFade(true);

    const promise = new Promise((resolve, reject) => {
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
          <IconButton
            color="primary"
            aria-label="Edit"
            sx={{ marginLeft: 'auto' }}
          >
            <Build fontSize="small" />
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
      {/* {todo.attributes.body} */}
      <input type="checkbox" defaultChecked={todo.attributes.is_done} />
    </div>
  );
};

export default ListItem;

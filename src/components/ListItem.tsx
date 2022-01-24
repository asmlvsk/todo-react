import React, { FC } from 'react';
import { Build, Delete } from '@mui/icons-material';
import { Grid, IconButton, Paper } from '@mui/material';
import { ITodos } from '../types/types';

interface ItemProps {
  todo: ITodos;
}
const ListItem: FC<ItemProps> = function ({ todo }) {
  const state = {
    fade: false,
  };

  const gridRef = React.createRef();

  const gridClass = state.fade ? 'fade-out' : '';

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
          <IconButton color="secondary" aria-label="Delete">
            <Delete fontSize="small" />
          </IconButton>
        </Paper>
      </Grid>
      {/* {todo.attributes.body} */}
      <input type="checkbox" checked={todo.attributes.is_done} />
    </div>
  );
};

export default ListItem;

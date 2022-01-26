import React, { FC, createRef } from 'react';
import { Build, Delete, Save } from '@mui/icons-material';
import { Grid, IconButton, Input, Paper } from '@mui/material';
import { ITodos } from '../types/types';

interface ItemProps {
  todo: ITodos;
}

const EditListItem: FC<ItemProps> = function ({ todo }) {
  const inputRef = createRef<HTMLInputElement>();

  return (
    <Grid xs={12} item key={todo.id}>
      <Paper
        elevation={2}
        sx={{
          margin: 'auto',
          padding: '10px',
          alignItems: 'center',
          marginTop: 10,
          width: 500,
        }}
      >
        <form
          onSubmit={() => {
            // props.saveTodo(props.index, inputRef.current.value);
          }}
          style={{ display: 'flex' }}
        >
          <Input
            style={{ width: '90%' }}
            defaultValue={todo.attributes.title}
            inputRef={inputRef}
          />
          <IconButton
            type="submit"
            color="primary"
            aria-label="Add"
            sx={{ marginLeft: 'auto', width: '10%' }}
          >
            <Save fontSize="small" />
          </IconButton>
        </form>
      </Paper>
    </Grid>
  );
};

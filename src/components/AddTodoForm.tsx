import React, { createRef, FC, useState } from 'react';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import axios from 'axios';
import { ITodos, ITodo } from '../types/types';

interface Props {
  addToList: (todo: ITodo) => void;
}

const AddTodoForm: FC<Props> = function ({ addToList }) {
  const errorRef = createRef<HTMLParagraphElement>();
  const inputRef = createRef<HTMLInputElement>();

  // eslint-disable-next-line consistent-return
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo: ITodo = {
      title: inputRef.current!.value,
      body: '',
      is_done: false,
    };

    if (inputRef.current!.value === '') {
      errorRef.current!.classList.add('active');
      return null;
    }
    errorRef.current!.classList.remove('active');

    addToList(newTodo);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
      <Input
        placeholder="Todo"
        inputProps={{
          'aria-label': 'Description',
        }}
        style={{ width: '90%' }}
        inputRef={inputRef}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ width: '10%' }}
      >
        Add
      </Button>

      <p ref={errorRef} className="error">
        Error, must enter a value!
      </p>
    </form>
  );
};

export default AddTodoForm;

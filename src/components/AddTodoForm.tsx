import React, { createRef, FC, useState } from 'react';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import axios from 'axios';
import { ITodos } from '../types/types';

interface Props {
  addToList: (todo: ITodos) => void;
}

const initTodo = { id: 0, attributes: { title: '', body: '', is_done: false } };

const AddTodoForm: FC<Props> = function ({ addToList }) {
  const [todos, setTodos] = useState(initTodo);
  const errorRef = createRef<HTMLParagraphElement>();
  const inputRef = createRef<HTMLInputElement>();

  // eslint-disable-next-line consistent-return
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(inputRef.current!.value);
    e.preventDefault();
    if (inputRef.current!.value === '') {
      errorRef.current!.classList.add('active');
      return null;
    }
    errorRef.current!.classList.remove('active');

    addToList(todos);
    setTodos(initTodo);
    e.currentTarget.reset();
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTodos({ ...todos, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
      <Input
        placeholder="Todo"
        inputProps={{
          'aria-label': 'Description',
        }}
        style={{ width: '90%' }}
        onChange={onInputChange}
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

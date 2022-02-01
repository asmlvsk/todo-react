import React, { createRef, FC } from 'react';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ITodo } from '../interfaces/interfaces';
import taskSchema from '../schemas/taskSchema';

interface Props {
  addToList: (todo: ITodo) => void;
}

const AddTodoForm: FC<Props> = function ({ addToList }) {
  const inputRef = createRef<HTMLInputElement>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITodo>({
    resolver: yupResolver(taskSchema),
  });

  const onSubmit = (data: ITodo) => {
    const newTodo: ITodo = {
      title: data.title,
      body: '',
      is_done: false,
    };

    addToList(newTodo);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex' }}>
      <Input
        placeholder="Todo"
        inputProps={{
          'aria-label': 'Description',
        }}
        style={{ width: '90%' }}
        inputRef={inputRef}
        {...register('title')}
      />
      <div className="invalid-feedback">{errors.title?.message}</div>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ width: '10%' }}
      >
        Add
      </Button>
    </form>
  );
};

export default AddTodoForm;

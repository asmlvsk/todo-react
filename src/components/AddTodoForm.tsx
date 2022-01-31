import React, { createRef, FC } from 'react';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { ITodo } from '../interfaces/interfaces';

interface Props {
  addToList: (todo: ITodo) => void;
}

type TaskSubmitForm = {
  title: string;
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const AddTodoForm: FC<Props> = function ({ addToList }) {
  const errorRef = createRef<HTMLParagraphElement>();
  const inputRef = createRef<HTMLInputElement>();

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required')
      .min(2, 'Title must be at least 2 characters'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskSubmitForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: TaskSubmitForm) => {
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

      <p ref={errorRef} className="error">
        Error, must enter a value!
      </p>
      <Snackbar autoHideDuration={6000}>
        <Alert severity="success" sx={{ width: '100%' }}>
          {errors.title?.message}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default AddTodoForm;

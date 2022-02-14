/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable no-nested-ternary */
import React, { FC, useState } from 'react';
import { Build, Delete } from '@mui/icons-material';
import SaveIcon from '@mui/icons-material/Save';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {
  Autocomplete,
  Box,
  Chip,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { ICategory, ITodo, ITodos } from '../interfaces/interfaces';

interface ItemProps {
  todo: ITodos;
  removeFromList: (id: number) => void;
  updateTodo: (id: number, todo: ITodo) => void;
  updateTodoIsDone: (id: number, done: boolean) => void;
  updateCategoryInTask: (id: number, categoryId: number) => void;
  categories: ICategory[];
}
const ListItem: FC<ItemProps> = function ({
  todo,
  removeFromList,
  updateTodo,
  updateTodoIsDone,
  categories,
  updateCategoryInTask,
}) {
  const [fade, setFade] = useState(false);

  const [toggle, setToggle] = useState(false);
  const [upText, setUpText] = useState('');
  const [upInput, setUpInput] = useState('');
  const [isDone, setIsDone] = useState(todo.attributes.is_done);
  const [categoryName, setCategoryName] = useState<ICategory[] | string[]>(
    categories
  );

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

  const handleChange = (event: SelectChangeEvent<typeof categoryName>) => {
    const {
      target: { value },
    } = event;

    setCategoryName(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <div>
      <Grid xs={12} className={`${gridClass}`} item key={todo.id}>
        <Paper
          sx={{
            width: 800,
            margin: 'auto',
          }}
        >
          <div
            style={{
              padding: '10px',
              display: 'flex',
              alignItems: 'center',
              marginTop: 10,
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
          </div>

          <FormControl sx={{ m: 1, width: '100%' }}>
            <InputLabel id="demo-multiple-chip-label">Category</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={categoryName}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {todo.relationships.categories.data.map((key) =>
                    categories.map((c) =>
                      c.id === key.id
                        ? selected.map((selectedValue) => (
                            <Chip
                              key={selectedValue.id}
                              label={selectedValue.attributes.title}
                            />
                          ))
                        : null
                    )
                  )}
                </Box>
              )}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.attributes.title}>
                  {category.attributes.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
      </Grid>
    </div>
  );
};

export default ListItem;

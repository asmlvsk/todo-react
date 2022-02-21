/* eslint-disable no-nested-ternary */
import React, { FC, useState } from 'react';
import { Build, Delete } from '@mui/icons-material';
import SaveIcon from '@mui/icons-material/Save';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {
  Autocomplete,
  Grid,
  IconButton,
  Input,
  Paper,
  TextField,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { ICategory, ITodo, IKeyValue, ITodos } from '../interfaces/interfaces';

interface ItemProps {
  todo: ITodos;
  removeFromList: (id: number) => void;
  updateTodo: (id: number, todo: ITodo) => void;
  updateTodoIsDone: (id: number, done: boolean) => void;
  updateCategoryInTask: (id: number, categoryIds: IKeyValue[]) => void;
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

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const gridClass = fade ? 'fade-out' : '';

  const categoriesWithValues = categories.map((category) => ({
    value: category.id,
    ...category,
  }));

  const defaultCategoryIds = todo.relationships.categories.data.map(
    (cat) => cat.id
  );

  const defaultValues = categoriesWithValues.filter((cat) =>
    defaultCategoryIds.includes(cat.id)
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

  const handleChange = (e: React.SyntheticEvent, value: ICategory[]) => {
    updateCategoryInTask(todo.id, [...value]);
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

          <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={categoriesWithValues}
            disableCloseOnSelect
            onChange={handleChange}
            defaultValue={defaultValues}
            isOptionEqualToValue={(option, value) =>
              option.attributes.title === value.attributes.title
            }
            getOptionLabel={(option) => option.attributes.title}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.attributes.title}
              </li>
            )}
            style={{ width: 500 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Checkboxes"
                placeholder="Favorites"
              />
            )}
          />
        </Paper>
      </Grid>
    </div>
  );
};

export default ListItem;

/* eslint-disable @typescript-eslint/comma-dangle */
import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  ITodos,
  ITodo,
  IUserBody,
  IUserLoginBody,
  IUserName,
  ICategory,
  IKeyValue,
} from './interfaces/interfaces';
import NavBar from './components/NavBar';
import {
  fetchTodos,
  postTodo,
  removeTodoById,
  updateTodo,
  updateTodoCategory,
  updateTodoStatus,
} from './services/todosApi';
import {
  signUpUser,
  signInUser,
  loggedIn,
  logoutUser,
} from './services/userApi';
import MainPage from './components/MainPage';
import fetchCategories from './services/categoryApi';

function App(this: any) {
  const [todos, setTodos] = useState<ITodos[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [user, setUser] = useState<IUserName | null>(null);
  const [isLogged, setIsLogged] = useState(false);

  const getAllTodos = async () => {
    const { data, error } = await fetchTodos();
    if (!error) setTodos(data.data);
  };

  const getCategories = async () => {
    const { data } = await fetchCategories();
    setCategories(data.data);
  };

  const loggedInHandler = async () => {
    const { data } = await loggedIn();
    if (data.logged_in) {
      setUser(data.user);
      getCategories();
      getAllTodos();
    }
    setIsLogged(data.logged_in);
  };

  useEffect(() => {
    loggedInHandler();
  }, []);

  const postTodosHandler = async (todo: ITodo) => {
    const { data } = await postTodo(todo);
    setTodos([...todos, data.data]);
  };

  const updateTodoHandler = async (id: number, todo: ITodo) => {
    const { data } = await updateTodo(id, todo);
    setTodos(todos.map((item) => (item.id === id ? { ...data.data } : item)));
  };

  const deleteTodoHandler = async (id: number) => {
    await removeTodoById(id);
    setTodos(todos.filter((t: ITodos) => t.id !== id));
  };

  const updateTodoStatusHandler = async (id: number, isDone: boolean) => {
    const { data } = await updateTodoStatus(id, isDone);
    setTodos(todos.map((item) => (item.id === id ? { ...data.data } : item)));
  };

  const postUserHandler = async (userBody: IUserBody) => {
    const { data, error } = await signUpUser(userBody);
    if (!error) {
      setIsLogged(true);
      setUser(data.user);
      getAllTodos();
    }
  };

  const logInUserHandler = async (userBody: IUserLoginBody) => {
    const { data, error } = await signInUser(userBody);

    if (!error || error.response.status !== 401) {
      setIsLogged(true);
      setUser(data.user);
      getAllTodos();
    }
    // Error Handler
  };

  const logOutUserHandler = async () => {
    await logoutUser();
    setUser(null);
    setIsLogged(false);
  };

  const updateCategoryInTask = async (id: number, categoryIds: IKeyValue[]) => {
    const { data } = await updateTodoCategory(id, categoryIds);
    setTodos(todos.map((todo) => (todo.id === id ? { ...data.data } : todo)));
  };

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar
          signUpUser={postUserHandler}
          signInUser={logInUserHandler}
          logOutUserHandler={logOutUserHandler}
          userName={user ? user?.name : null}
        />
        <Routes>
          <Route
            path="/"
            element={
              <MainPage
                todos={todos}
                categories={categories}
                isLogged={isLogged}
                postTodosHandler={postTodosHandler}
                updateTodoHandler={updateTodoHandler}
                deleteTodoHandler={deleteTodoHandler}
                updateTodoStatusHandler={updateTodoStatusHandler}
                updateCategoryInTask={updateCategoryInTask}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  ITodos,
  ITodo,
  IUserBody,
  IUserLoginBody,
} from './interfaces/interfaces';
import NavBar from './components/NavBar';
import {
  fetchTodos,
  postTodo,
  removeTodoById,
  updateTodo,
  updateTodoStatus,
} from './services/todosApi';
import {
  signUpUser,
  signInUser,
  loggedIn,
  logoutUser,
} from './services/userApi';
import MainPage from './components/MainPage';

function App(this: any) {
  const [todos, setTodos] = useState<ITodos[]>([]);
  const [userName, setUserName] = useState('');
  const [isLogged, setIsLogged] = useState(false);

  const getAllTodos = async () => {
    const { data, error } = await fetchTodos();
    setTodos(data.data);
  };

  const loggedInHandler = async () => {
    const { data, error } = await loggedIn();
    if (data.logged_in) {
      getAllTodos();
    }
    setUserName(data.user.name);
    setIsLogged(data.logged_in);
  };

  useEffect(() => {
    loggedInHandler();
  }, []);

  const postTodosHandler = async (todo: ITodo) => {
    const { data, error } = await postTodo(todo);
    setTodos([...todos, data.data]);
  };

  const updateTodoHandler = async (id: number, todo: ITodo) => {
    const { data, error } = await updateTodo(id, todo);
    setTodos(todos.map((item) => (item.id === id ? { ...data.data } : item)));
  };

  const deleteTodoHandler = async (id: number) => {
    const { data, error } = await removeTodoById(id);
    setTodos(todos.filter((t: ITodos) => t.id !== id));
  };

  const updateTodoStatusHandler = async (id: number, isDone: boolean) => {
    const { data, error } = await updateTodoStatus(id, isDone);
    setTodos(todos.map((item) => (item.id === id ? { ...data.data } : item)));
  };

  const postUserHandler = async (userBody: IUserBody) => {
    const { data, error } = await signUpUser(userBody);
  };

  const logInUserHandler = async (userBody: IUserLoginBody) => {
    const { data, error } = await signInUser(userBody);
  };

  const logOutUserHandler = async () => {
    const { data, error } = await logoutUser();
  };

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar
          signUpUser={postUserHandler}
          signInUser={logInUserHandler}
          logOutUserHandler={logOutUserHandler}
          userName={userName}
        />
        <Routes>
          <Route
            path="/"
            element={
              <MainPage
                todos={todos}
                isLogged={isLogged}
                postTodosHandler={postTodosHandler}
                updateTodoHandler={updateTodoHandler}
                deleteTodoHandler={deleteTodoHandler}
                updateTodoStatusHandler={updateTodoStatusHandler}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

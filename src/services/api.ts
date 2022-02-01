import axios from 'axios';

const API = axios.create({ baseURL: 'https://tasks-ruby.herokuapp.com' });

export default API;

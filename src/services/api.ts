/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const API = axios.create({ baseURL: 'http://localhost:4000' });

import axios from 'axios';
import url from '../assets/url'

const api = axios.create({
  baseURL: url.server + '/',
  headers: {
    'Content-Type': 'application/json'
  }
});

//Antes de enviar
api.interceptors.request.use(async (request) => {
  request.headers['X-Riot-Token'] = 'RGAPI-59d67a1a-9d78-48a4-bf25-2cd54793a555'
  console.log('request', request.data);

  return request;
});

//Antes de chegar
api.interceptors.response.use(async (response) => {
  console.log('response');
  return response
}, async (err) => {
  console.log('response erro');
  return Promise.reject(err.response);
});

export default api;
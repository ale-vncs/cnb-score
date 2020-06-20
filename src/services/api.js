import axios from 'axios';

const api = axios.create({
  baseURL: process.env.URL_API + '/'
});

//Antes de enviar
api.interceptors.request.use(async (request) => {
  console.log('request');

  request.headers.Authorization = 'Bearer ' + token;

  console.log(request.data);

  return request;
});

//Antes de chegar
api.interceptors.response.use(async (response) => {
  console.log('response');
  return response
}, async (err) => {
  return Promise.reject(err.response);
});

export default api;
import axios from 'axios';

export const getTasks = () => axios.get('/tasks')
  .then(response => response.data);

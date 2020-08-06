import axios from 'axios';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export default {
  todos: {
    get: async ms => {
      const res = await axios.get('/todos');
      await sleep(ms);
      return res.data;
    },
  },
};

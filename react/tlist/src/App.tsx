import { configureStore } from '@reduxjs/toolkit';
import originalAxios from 'axios';
import { Provider } from 'react-redux';
import { userReducer } from './lib/userSlice';
import { Context, getApiUrl } from './lib/utils';
import Todolist from './todolist/Todolist';
import { IUser } from './lib/types';

function App() {
  const axios = originalAxios.create({ baseURL: 'http://localhost:3001' });
  axios.interceptors.response.use(
    response => response.data,
    error => {
      console.log(error.response);
      return Promise.reject(error);
    }
  );

  const store = { axios };
  const reduxStore = configureStore({
    reducer: {
      user: userReducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: { extraArgument: { axios, getApiUrl } },
        serializableCheck: false,
      }),
  });

  return (
    <Provider store={reduxStore}>
      <Context.Provider value={store}>
        <div className="App">
          <Todolist />
        </div>
      </Context.Provider>
    </Provider>
  );
}

export type RootState = {
  user: IUser;
};

export default App;

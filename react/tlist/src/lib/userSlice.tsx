import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const guestUser = {
  id: '-1',
  username: 'guest',
  isSignedIn: false,
};

export const login = createAsyncThunk('user/login', async (userId: any, thunkAPI: any) => {
  const { axios, getApiUrl } = thunkAPI.extra;
  const user = await axios.get(getApiUrl('user', { id: userId }));
  return user;
}) as any;

export const userSlice = createSlice({
  name: 'user',
  initialState: guestUser,
  reducers: {
    logout: state => guestUser,
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => action.payload,
  },
});

export const { logout } = userSlice.actions;
export const userReducer = userSlice.reducer;

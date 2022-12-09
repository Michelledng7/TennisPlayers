import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//get user from localstorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
	user: user ? user : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

//register player
export const register = createAsyncThunk(
	'auth/register',
	async (player, thunkAPI) => {}
);

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: (state) => {
			state.isLoading = false;
			state.isError = false;
			state.isSuccess = false;
			state.message = '';
		},
	},
	extraReducers: () => {},
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

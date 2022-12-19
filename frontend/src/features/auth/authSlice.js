import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

//get player from localstorage as example, will be replace with memoised selector
const player = JSON.parse(localStorage.getItem('player'));

const initialState = {
	player: player ? player : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

//register player
export const register = createAsyncThunk(
	'auth/register',
	async (player, thunkAPI) => {
		try {
			return await authService.register(player);
		} catch (err) {
			const message =
				(err.response && err.response.data && err.response.data.message) ||
				err.message ||
				err.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

//login player
export const login = createAsyncThunk(
	'auth/login',
	async (player, thunkAPI) => {
		try {
			return await authService.login(player);
		} catch (err) {
			const message =
				(err.response && err.response.data && err.response.data.message) ||
				err.message ||
				err.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

//logout player
export const logout = createAsyncThunk('auth/logout', async () => {
	await authService.logout();
});

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
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isError = false;
				state.isLoading = false;
				state.isSuccess = true;
				state.player = action.payload;
			})
			.addCase(register.rejected, (state, action) => {
				state.isError = true;
				state.isLoading = false;
				state.isSuccess = false;
				state.message = action.payload;
				state.player = null;
			})
			.addCase(logout.fulfilled, (state) => {
				state.isError = false;
				state.isLoading = false;
				state.isSuccess = true;
				state.player = null;
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isError = false;
				state.isLoading = false;
				state.isSuccess = true;
				state.player = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.isError = true;
				state.isLoading = false;
				state.isSuccess = false;
				state.message = action.payload;
				state.player = null;
			});
	},
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

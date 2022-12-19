import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import matchService from './matchService';

const initialState = {
	matches: [],
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: '',
};

//create new match result
export const createMatch = createAsyncThunk(
	'match/create',
	async (matchData, thunkAPI) => {
		try {
			console.log(thunkAPI);
			const token = thunkAPI.getState().auth.player.token;
			console.log(token);
			return await matchService.createMatch(matchData, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const getMatches = createAsyncThunk(
	'matches/getAll',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.player.token;
			console.log(token);
			return await matchService.getMatches(token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			console.log(thunkAPI);
			return thunkAPI.rejectWithValue(message);
		}
	}
);
//delete match result
export const deleteMatch = createAsyncThunk(
	'matches/delete',
	async (matchId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.player.token;
			return await matchService.deleteMatch(matchId, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const matchSlice = createSlice({
	name: 'match',
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(createMatch.pending, (state) => {
				state.isLoading = true;
				state.isSuccess = false;
				state.isError = false;
				state.message = '';
			})
			.addCase(createMatch.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.matches.push(action.payload);
				state.message = 'Match created successfully';
			})
			.addCase(createMatch.rejected, (state, action) => {
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getMatches.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getMatches.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.matches = action.payload;
			})
			.addCase(getMatches.rejected, (state, action) => {
				state.isSuccess = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(deleteMatch.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteMatch.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				console.log(action.payload);
				state.matches = state.matches.filter(
					(match) => match._id !== action.payload._id
				);
			})
			.addCase(deleteMatch.rejected, (state, action) => {
				state.isSuccess = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = matchSlice.actions;
export default matchSlice.reducer;

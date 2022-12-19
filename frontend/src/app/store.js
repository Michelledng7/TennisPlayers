import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import matchReducer from '../features/match/matchSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		match: matchReducer,
	},
});

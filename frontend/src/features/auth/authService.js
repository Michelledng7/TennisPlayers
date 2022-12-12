//make http request (get, post, send token) to backend to get player info like use postman
//make http request and sending data back, setting data in localstorage
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/players/';

//Register player
const register = async (playerData) => {
	const response = await axios.post(API_URL, playerData);
	console.log(response.data);
	if (response.data) {
		localStorage.setItem('player', JSON.stringify(response.data));
	}
	return response.data;
};

const authService = {
	register,
};

export default authService;
//const register

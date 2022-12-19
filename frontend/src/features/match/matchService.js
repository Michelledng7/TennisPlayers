import axios from 'axios';

const API_URL = '/api/matches/';
const createMatch = async (matchData, token) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		const response = await axios.post(API_URL, matchData, config);
		console.log(response);
		//console.log(response.data);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

const getMatches = async (token) => {
	const config = {
		headers: {
			'Content-Type': 'application-json',
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		const response = await axios.get(API_URL, config);
		console.log(response);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

const deleteMatch = async (matchId, token) => {
	const config = {
		headers: {
			'Content-Type': 'application-json',
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		const response = await axios.delete(`${API_URL}${matchId}`, config);
		console.log(response);
		return response.data;
	} catch (error) {}
};
const matchService = { createMatch, getMatches, deleteMatch };

export default matchService;

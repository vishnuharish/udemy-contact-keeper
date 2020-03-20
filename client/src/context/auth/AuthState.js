import React, { useReducer } from 'react';
import AuthReducer from './authReducer';
import AuthContext from './authContext';
import axios from 'axios';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	AUTH_ERROR,
	CLEAR_ERRORS
} from '../types';
const AuthState = props => {
	const intialState = {
		user: null,
		token: localStorage.getItem('token'),
		error: null,
		isAuthenticated: null,
		loading: true
	};

	const [state, dispatch] = useReducer(AuthReducer, intialState);
	// Register

	const register = async formData => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		try {
			const res = await axios.post('/api/users', formData, config);
			dispatch({ type: REGISTER_SUCCESS, payload: res.data });
		} catch (error) {
			dispatch({ type: REGISTER_FAIL, payload: error.response.data.msg });
		}
	};

	// Load User
	const loadUser = async () => {
		// @todo - use global headers
		try {
			const res = await axios.get('/api/auth');
			dispatch({ type: USER_LOADED, payload: res.data });
		} catch (err) {
			dispatch({ type: AUTH_ERROR, payload: err.response.data.msg });
		}
	};
	// Login
	// Logout
	// clearErrors
	const clearErrors = () => {
		dispatch({ type: CLEAR_ERRORS });
	};

	return (
		<AuthContext.Provider
			value={{
				user: state.user,
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				error: state.error,
				register,
				clearErrors,
				loadUser
			}}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;

import React, { useReducer } from 'react';
import AuthReducer from './authReducer';
import AuthContext from './authContext';
import axios from 'axios';
const AuthState = props => {
	const intialState = {
		user: null,
		token: localStorage.getItem('token'),
		error: null,
		isAuthenticated: null,
		loading: true
	};

	const [state, dispatch] = useReducer(AuthReducer, intialState);

	// Login
	// Logout

	return (
		<AuthContext.Provider
			value={{
				user: state.user,
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				error: state.error
			}}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;

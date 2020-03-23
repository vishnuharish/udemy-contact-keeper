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

export default (state, action) => {
	switch (action.type) {
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false
			};
		case REGISTER_FAIL:
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOGOUT:
			localStorage.removeItem('token');
			return {
				user: null,
				token: null,
				error: action.payload,
				isAuthenticated: null,
				loading: false
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			};
		case USER_LOADED:
			return {
				...state,
				user: action.payload,
				isAuthenticated: true,
				loading: false
			};

		default:
			return state;
	}
};

import * as api from '../api';
import { AUTH, LOGOUT, AUTH_LOADING, PUSH } from '../constants/actionTypes';
import { USER } from '../constants/storageKeys';

export const recoverCurrentUser = (history) => async (dispatch) => {
	dispatch({ type: AUTH_LOADING });
	let user = JSON.parse(localStorage.getItem(USER));
	if (user) {
		dispatch({ type: AUTH, payload: user });
	} else {
		dispatch({ type: LOGOUT });
	}
};

export const signup = (userData, history) => async (dispatch) => {
	dispatch({ type: AUTH_LOADING });
	try {
		let { data } = await api.signup(userData);
		history.push('/');
		dispatch({ type: AUTH, payload: data });
	} catch (error) {
		console.error(error);
		dispatch({ type: LOGOUT });
		dispatch({
			type: PUSH,
			payload: { type: 'error', message: error.message },
		});

		// Show error to user
	}
};

export const signin =
	(userData, history, isGoogleSignin = false) =>
	async (dispatch) => {
		dispatch({ type: AUTH_LOADING });
		let { email, password } = userData;
		try {
			let { data } = isGoogleSignin
				? await api.googleSignin(userData)
				: await api.signin({ email, password });

			history.push('/');
			dispatch({ type: AUTH, payload: data });
		} catch (error) {
			console.error(error);
			dispatch({ type: LOGOUT });
			dispatch({
				type: PUSH,
				payload: { type: 'error', message: error.message },
			});
			// Show error to user
		}
	};

export const logout = (history) => async (dispatch) => {
	dispatch({ type: AUTH_LOADING });
	try {
		await api.logout();
	} catch (error) {
		console.error(error);
		dispatch({
			type: PUSH,
			payload: { type: 'error', message: error.message },
		});
		// Show error to user
	}

	history.push('/');
	dispatch({ type: LOGOUT });
};

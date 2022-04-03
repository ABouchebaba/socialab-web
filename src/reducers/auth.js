import { AUTH, LOGOUT, AUTH_LOADING } from '../constants/actionTypes';
import { USER } from '../constants/storageKeys';

const initialState = {
	user: false,
	loading: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case AUTH: {
			localStorage.setItem(USER, JSON.stringify(action?.payload));
			return { ...state, user: action?.payload, loading: false };
		}
		case AUTH_LOADING: {
			return { ...state, loading: true };
		}
		case LOGOUT: {
			localStorage.removeItem(USER);
			return initialState;
		}
		default: {
			return state;
		}
	}
};

export default reducer;

import { PUSH, DISMISS } from '../constants/actionTypes';

const initialState = false;

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case PUSH: {
			return action.payload;
		}
		case DISMISS: {
			return false;
		}
		default: {
			return state;
		}
	}
};

export default reducer;

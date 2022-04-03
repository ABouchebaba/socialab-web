import { DISMISS } from '../constants/actionTypes';

export const dismiss = () => async (dispatch) => {
	dispatch({ type: DISMISS });
};

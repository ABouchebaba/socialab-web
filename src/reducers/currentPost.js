import { SET, UNSET } from '../constants/actionTypes';

// currentPost contains the selected post id
const reducer = (currentPost = null, action) => {
	switch (action.type) {
		case SET: {
			return action.payload;
		}
		case UNSET: {
			return null;
		}
		default: {
			return currentPost;
		}
	}
};

export default reducer;

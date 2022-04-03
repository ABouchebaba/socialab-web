import {
	FETCH_ALL,
	CREATE,
	UPDATE,
	DELETE,
	LIKE,
	FETCH_POSTS_LOADING,
	CREATE_POSTS_LOADING,
	DELETE_POSTS_LOADING,
	ERROR_POSTS,
} from '../constants/actionTypes';

const initialState = {
	posts: [],
	fetchLoading: false,
	createLoading: false,
	deleteLoading: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_ALL: {
			return { posts: action.payload, fetchLoading: false };
		}
		case CREATE: {
			return { posts: [...state.posts, action.payload], createLoading: false };
		}
		case UPDATE:
		case LIKE: {
			let posts = state.posts.map((post) =>
				post._id === action.payload._id ? action.payload : post
			);
			return { posts, createLoading: false };
		}
		case DELETE: {
			let posts = state.posts.filter((post) => post._id !== action.payload);
			return { posts, deleteLoading: false };
		}
		case FETCH_POSTS_LOADING: {
			return { ...state, fetchLoading: true };
		}
		case CREATE_POSTS_LOADING: {
			return { ...state, createLoading: true };
		}
		case DELETE_POSTS_LOADING: {
			return { ...state, deleteLoading: true };
		}
		case ERROR_POSTS: {
			return {
				...state,
				deleteLoading: false,
				createLoading: false,
				fetchLoading: false,
			};
		}
		default: {
			return state;
		}
	}
};

export default reducer;

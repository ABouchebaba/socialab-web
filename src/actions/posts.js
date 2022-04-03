import * as api from '../api';
import {
	FETCH_ALL,
	CREATE,
	UPDATE,
	DELETE,
	LIKE,
	SET,
	UNSET,
	FETCH_POSTS_LOADING,
	CREATE_POSTS_LOADING,
	DELETE_POSTS_LOADING,
	ERROR_POSTS,
	PUSH,
} from '../constants/actionTypes';

export const getPosts = () => async (dispatch) => {
	dispatch({ type: FETCH_POSTS_LOADING });

	try {
		let { data } = await api.fetchPosts();
		dispatch({ type: FETCH_ALL, payload: data });
	} catch (error) {
		console.error(error);
		dispatch({ type: ERROR_POSTS });
		dispatch({
			type: PUSH,
			payload: { type: 'error', message: error.response.data.message },
		});
	}
};

export const createPost = (postData) => async (dispatch) => {
	dispatch({ type: CREATE_POSTS_LOADING });
	try {
		let { data } = await api.createPost(postData);
		dispatch({ type: CREATE, payload: data });
		dispatch({
			type: PUSH,
			payload: { type: 'success', message: 'Post created successfully' },
		});
	} catch (error) {
		console.error(error.response.data);
		dispatch({ type: ERROR_POSTS });
		dispatch({
			type: PUSH,
			payload: { type: 'error', message: error.response.data.message },
		});
	}
};

export const updatePost = (id, postData) => async (dispatch) => {
	dispatch({ type: CREATE_POSTS_LOADING });
	try {
		let { title, creator, message, tags, selectedFile } = postData;
		let { data } = await api.updatePost(id, {
			title,
			creator,
			message,
			tags,
			selectedFile,
		});
		dispatch({ type: UPDATE, payload: data });
		dispatch({
			type: PUSH,
			payload: { type: 'success', message: 'Post updated successfully' },
		});
	} catch (error) {
		console.error(error);
		dispatch({ type: ERROR_POSTS });
		dispatch({
			type: PUSH,
			payload: { type: 'error', message: error.response.data.message },
		});
	}
};

export const likePost = (id) => async (dispatch) => {
	// dispatch({ type: POSTS_LOADING });
	try {
		let { data } = await api.likePost(id);
		dispatch({ type: LIKE, payload: data });
	} catch (error) {
		console.error(error);
		dispatch({ type: ERROR_POSTS });
		dispatch({
			type: PUSH,
			payload: { type: 'error', message: error.response.data.message },
		});
	}
};

export const deletePost = (id) => async (dispatch) => {
	dispatch({ type: DELETE_POSTS_LOADING });
	try {
		await api.deletePost(id);
		dispatch({ type: DELETE, payload: id });
		dispatch({
			type: PUSH,
			payload: { type: 'success', message: 'Post deleted successfully' },
		});
	} catch (error) {
		console.error(error);

		dispatch({ type: ERROR_POSTS });
		dispatch({
			type: PUSH,
			payload: { type: 'error', message: error.response.data.message },
		});
	}
};

export const setCurrentPost = (id) => async (dispatch) => {
	dispatch({ type: SET, payload: id });
};

export const unsetCurrentPost = () => async (dispatch) => {
	dispatch({ type: UNSET });
};

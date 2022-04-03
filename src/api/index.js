import axios from 'axios';

axios.defaults.withCredentials = 'same-origin';

const url = 'http://localhost:5000';

const postUrl = `${url}/posts`;
export const fetchPosts = () => axios.get(postUrl);
export const createPost = (postData) => axios.post(postUrl, postData);
export const updatePost = (id, postData) =>
	axios.patch(`${postUrl}/${id}`, postData);
export const deletePost = (id) => axios.delete(`${postUrl}/${id}`);
export const likePost = (id) => axios.patch(`${postUrl}/${id}/like`);

const userUrl = `${url}/users`;
export const signup = (userData) => axios.post(`${userUrl}/signup`, userData);
export const signin = (userData) => axios.post(`${userUrl}/signin`, userData);
export const googleSignin = (userData) =>
	axios.post(`${userUrl}/signin/google`, userData);
export const logout = () => axios.post(`${userUrl}/logout`);

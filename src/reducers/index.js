import { combineReducers } from 'redux';

import posts from './posts';
import currentPost from './currentPost';
import auth from './auth';
import notifications from './notifications';

export default combineReducers({
	auth,
	posts,
	currentPost,
	notifications,
});

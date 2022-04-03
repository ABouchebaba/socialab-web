import React, { useEffect, useState } from 'react';
import {
	Typography,
	TextField,
	Paper,
	Button,
	CircularProgress,
} from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost, unsetCurrentPost } from '../../actions/posts';

import useStyles from './styles';

const defaultPost = {
	creator: '',
	title: '',
	message: '',
	tags: [],
	selectedFile: '',
};

const Form = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [postData, setPostData] = useState(defaultPost);

	const [currentPost, loading] = useSelector((state) => [
		state.posts.posts.find((p) => p._id === state.currentPost),
		state.posts.createLoading,
	]);
	let user = useSelector((state) => state.auth.user);

	useEffect(() => {
		if (currentPost) {
			setPostData(currentPost);
		} else {
			setPostData(defaultPost);
		}
	}, [currentPost]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (currentPost) {
			dispatch(updatePost(currentPost._id, { ...postData, creator: user._id }));
		} else {
			dispatch(createPost({ ...postData, creator: user._id }));
			clear();
		}
		dispatch(unsetCurrentPost());
	};

	const handleChange = (e) => {
		setPostData({ ...postData, [e.target.name]: e.target.value });
	};

	const handleTagChange = (e) => {
		if (e.target.value === '') {
			setPostData({
				...postData,
				tags: defaultPost.tags,
			});
		} else {
			setPostData({
				...postData,
				tags: e.target.value.split(',').map((tag) => tag.trim()),
			});
		}
	};

	const handleFileChange = ({ base64 }) => {
		setPostData({ ...postData, selectedFile: base64 });
	};

	const clear = () => dispatch(unsetCurrentPost());

	return (
		<Paper className={classes.paper}>
			{loading ? (
				<CircularProgress color='secondary' thickness={5} size={75} />
			) : (
				<form
					autoComplete='off'
					noValidate
					className={`${classes.root} ${classes.form}`}
					onSubmit={handleSubmit}>
					<Typography variant='h6'>
						{currentPost ? 'Updating ' : 'Creating a'} post
					</Typography>
					<TextField
						name='title'
						variant='outlined'
						label='title'
						fullWidth
						value={postData.title}
						onChange={handleChange}
					/>
					<TextField
						name='message'
						variant='outlined'
						label='message'
						fullWidth
						value={postData.message}
						onChange={handleChange}
					/>
					<TextField
						name='tags'
						variant='outlined'
						label='tags'
						fullWidth
						value={postData.tags}
						onChange={handleTagChange}
					/>
					<div className={classes.fileInput}>
						<FileBase type='file' multiple={false} onDone={handleFileChange} />
					</div>
					<Button
						className={classes.buttonSubmit}
						variant='contained'
						color='primary'
						size='large'
						type='submit'
						fullWidth>
						Submit
					</Button>
					<Button
						variant='contained'
						color='secondary'
						size='small'
						onClick={clear}
						fullWidth>
						Clear
					</Button>
				</form>
			)}
		</Paper>
	);
};

export default Form;

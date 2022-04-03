import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = () => {
	const classes = useStyles();
	let { posts, fetchLoading } = useSelector((state) => state.posts);
	let size = useSelector((state) => (state.auth.user ? 6 : 4));

	return fetchLoading ? (
		<CircularProgress color='secondary' thickness={5} size={75} />
	) : (
		<Grid
			className={classes.container}
			container
			alignItems='stretch'
			spacing={4}>
			{posts.map((post) => (
				<Grid key={post._id} item xs={12} sm={size}>
					<Post post={post} />
				</Grid>
			))}
		</Grid>
	);
};

export default Posts;

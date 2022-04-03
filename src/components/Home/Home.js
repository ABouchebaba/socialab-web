import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from '../../styles';
import { Container, Grow, Grid } from '@material-ui/core';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

import { getPosts } from '../../actions/posts';

const Home = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPosts());
	}, [dispatch]);

	return (
		<Grow in>
			<Container maxWidth='md'>
				<Grid
					className={classes.mainContainer}
					container
					justifyContent='space-between'
					alignItems='stretch'
					spacing={3}>
					<Grid item xs={12}>
						<Posts />
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};

export default Home;

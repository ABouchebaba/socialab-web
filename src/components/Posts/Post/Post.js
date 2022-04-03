import React from 'react';
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
} from '@material-ui/core';
import {
	ThumbUpAlt as ThumbUpAltIcon,
	Delete as DeleteIcon,
	MoreHoriz as MoreHorizIcon,
} from '@mui/icons-material';

import moment from 'moment';

import useStyles from './styles';
import { setCurrentPost, deletePost, likePost } from '../../../actions/posts';
import { useDispatch, useSelector } from 'react-redux';

const Post = ({ post }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	let user = useSelector((state) => state.auth.user);

	const selectPost = () => {
		dispatch(setCurrentPost(post._id));
	};

	const handleDeletePost = () => {
		dispatch(deletePost(post._id));
	};

	const handleLikePost = () => {
		dispatch(likePost(post._id));
	};

	return (
		<Card className={classes.card}>
			<CardMedia
				className={classes.media}
				image={post.selectedFile ? post.selectedFile : '#'}
				title={post.title}
			/>
			<div className={classes.overlay}>
				<Typography variant='h6'>{`${post.creator.firstName} ${post.creator.lastName}`}</Typography>
				<Typography variant='body2'>
					{moment(post.createdAt).fromNow()}
				</Typography>
			</div>
			{post.creator._id === user._id && (
				<div className={classes.overlay2}>
					<Button style={{ color: 'white' }} size='small' onClick={selectPost}>
						<MoreHorizIcon fontSize='medium' />
					</Button>
				</div>
			)}

			<div className={classes.details}>
				<Typography variant='body2' color='textSecondary'>
					{post.tags.map((tag) => `#${tag} `)}
				</Typography>
			</div>
			<Typography className={classes.title} variant='h5' gutterBottom>
				{post.title}
			</Typography>
			<CardContent>
				<Typography
					variant='body2'
					color='textSecondary'
					component='p'
					gutterBottom>
					{post.message}
				</Typography>
			</CardContent>
			<CardActions className={classes.cardActions}>
				<Button color='primary' size='small' onClick={handleLikePost}>
					<ThumbUpAltIcon fontSize='small' />
					&nbsp; Like &nbsp;
					{post.likes.length}
				</Button>
				{post.creator._id === user._id && (
					<Button color='primary' size='small' onClick={handleDeletePost}>
						<DeleteIcon fontSize='small' />
						Delete
					</Button>
				)}
			</CardActions>
		</Card>
	);
};

export default Post;

import React, { useState } from 'react';

import {
	Container,
	Button,
	Typography,
	Paper,
	Avatar,
	Grid,
	CircularProgress,
} from '@material-ui/core';
import Input from './Input';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import GoogleLogin from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import useStyles from './styles';
import Icon from './Icon';

import { signup, signin } from '../../actions/auth';

const initialState = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const Auth = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	const [formData, setFormData] = useState(initialState);
	const [isSignUp, setIsSignUp] = useState(true);
	let { user, loading } = useSelector((state) => state.auth);

	// Auth page only accessible if user not authenticated (user not saved in store)
	if (user) return <Redirect to='/' />;

	const handleSubmit = (e) => {
		e.preventDefault();

		if (isSignUp) {
			dispatch(signup(formData, history));
		} else {
			dispatch(signin(formData, history));
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((previousFormData) => ({
			...previousFormData,
			[name]: value,
		}));
	};

	const switchMode = () => setIsSignUp((prevSignUp) => !prevSignUp);

	const onGoogleSuccess = async (res) => {
		const profile = res?.profileObj;
		const token = res?.tokenId;

		try {
			dispatch(signin({ profile, token }, history, true));
		} catch (error) {
			console.error(error);
		}
	};

	const onGoogleFailure = () => {
		console.error('Error on google auth');
	};

	return (
		<Container
			component='main'
			maxWidth='xs'
			justifycontent='center'
			align='center'>
			{loading ? (
				<CircularProgress color='secondary' thickness={5} size={75} />
			) : (
				<Paper className={classes.paper} elevation={3}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography variant='h5' align='center'>
						{isSignUp ? 'Sign Up' : 'Sign In'}
					</Typography>
					<form className={classes.form} onSubmit={handleSubmit}>
						<Grid container spacing={3}>
							{isSignUp && (
								<>
									<Input
										name='firstName'
										label='First Name'
										half
										onChange={handleChange}
									/>
									<Input
										name='lastName'
										label='Last Name'
										half
										onChange={handleChange}
									/>
								</>
							)}
							<Input
								name='email'
								label='Email Address'
								type='email'
								onChange={handleChange}
							/>
							<Input
								name='password'
								label='Password'
								type='password'
								onChange={handleChange}
							/>
							{isSignUp && (
								<Input
									name='confirmPassword'
									label='Repeat Password'
									type='password'
									onChange={handleChange}
								/>
							)}
						</Grid>

						<Button
							type='submit'
							color='primary'
							fullWidth
							variant='contained'
							className={classes.submit}>
							{isSignUp ? 'Sign Up' : 'Sign In'}
						</Button>
						<GoogleLogin
							clientId='922861160650-r90gbc9kh8iobclsn5nhql89tve9anec.apps.googleusercontent.com'
							render={(renderProps) => (
								<Button
									className={classes.googleButton}
									color='primary'
									fullWidth
									onClick={renderProps.onClick}
									disabled={renderProps.disabled}
									startIcon={<Icon />}
									variant='contained'>
									Google Sign In
								</Button>
							)}
							onSuccess={onGoogleSuccess}
							onFailure={onGoogleFailure}
							cookiePolicy='single_host_origin'
						/>
						<Grid container justifycontent='flex-end' align='center'>
							<Grid item>
								<Button onClick={switchMode}>
									{isSignUp
										? 'Already have an account ? Sign In'
										: "Don't have an account ? Sign Up "}
								</Button>
							</Grid>
						</Grid>
					</form>
				</Paper>
			)}
		</Container>
	);
};

export default Auth;

import React, { useState } from 'react';

import {
	Typography,
	Avatar,
	Button,
	Box,
	IconButton,
	Menu,
	MenuItem,
	Tooltip,
	useMediaQuery,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';

import { Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import Form from '../Form/Form';
import { logout } from '../../actions/auth';

const NavbarRight = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [postFormOpen, setPostFormOpen] = useState(false);
	const [anchorElUser, setAnchorElUser] = useState(null);
	let { user } = useSelector((state) => state.auth);

	const handleLogout = () => {
		dispatch(logout(history));
		handleCloseUserMenu();
	};

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<Box sx={{ flexGrow: 0 }}>
			{user ? (
				<>
					<Tooltip title='Search posts'>
						<IconButton
							onClick={handleOpenUserMenu}
							sx={{ mr: { sm: 1, md: 1 }, p: 1 }}>
							<SearchIcon sx={{ fontSize: 30 }} />
						</IconButton>
					</Tooltip>
					<Tooltip title='Create post'>
						<IconButton
							onClick={() => setPostFormOpen(true)}
							sx={{ mr: { sm: 1, md: 3 }, p: 1 }}>
							<AddIcon sx={{ fontSize: 30 }} />
						</IconButton>
					</Tooltip>
					<Dialog open={postFormOpen} onClose={() => setPostFormOpen(false)}>
						<DialogTitle>Create a post</DialogTitle>
						<DialogContent>
							<Form />
						</DialogContent>
						<DialogActions>
							<Button onClick={() => {}}>Cancel</Button>
							<Button onClick={() => {}}>Subscribe</Button>
						</DialogActions>
					</Dialog>
					<Tooltip title='Open settings'>
						<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
							<Avatar
								alt={`${user.firstName} ${user.lastName}`}
								src={user?.imageUrl}>
								{user?.firstName.charAt(0)}
							</Avatar>
						</IconButton>
					</Tooltip>
					<Menu
						sx={{ mt: '45px' }}
						id='menu-appbar'
						anchorEl={anchorElUser}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						keepMounted
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						open={Boolean(anchorElUser)}
						onClose={handleCloseUserMenu}>
						<MenuItem
							onClick={handleCloseUserMenu}
							component={Link}
							variant='text'
							to='/profile'>
							<Typography textAlign='center'>Profile</Typography>
						</MenuItem>
						<MenuItem
							onClick={handleCloseUserMenu}
							component={Link}
							variant='text'
							to='/settings'>
							<Typography textAlign='center'>Settings</Typography>
						</MenuItem>
						<MenuItem onClick={handleLogout}>
							<Typography textAlign='center'>Logout</Typography>
						</MenuItem>
					</Menu>
				</>
			) : (
				<Button component={Link} to='/auth' variant='contained' color='primary'>
					Login
				</Button>
			)}
		</Box>
	);
};

export default NavbarRight;

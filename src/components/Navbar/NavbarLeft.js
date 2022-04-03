import React, { useState } from 'react';

import {
	Typography,
	Button,
	Box,
	IconButton,
	Menu,
	MenuItem,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const pages = { Home: '/', About: '/about', Contact: '/contact' };

const NavbarLeft = () => {
	const [anchorElNav, setAnchorElNav] = useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	return (
		<>
			<Typography
				variant='Link'
				to='/'
				noWrap
				component='div'
				sx={{ mr: 4, display: { xs: 'none', md: 'flex' } }}>
				LOGO
			</Typography>

			<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
				<IconButton
					size='large'
					aria-label='account of current user'
					aria-controls='menu-appbar'
					aria-haspopup='true'
					onClick={handleOpenNavMenu}
					color='inherit'>
					<MenuIcon />
				</IconButton>
				<Menu
					id='menu-appbar'
					anchorEl={anchorElNav}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left',
					}}
					keepMounted
					transformOrigin={{
						vertical: 'top',
						horizontal: 'left',
					}}
					open={Boolean(anchorElNav)}
					onClose={handleCloseNavMenu}
					sx={{
						display: { xs: 'block', md: 'none' },
					}}>
					{Object.keys(pages).map((page) => (
						<MenuItem
							key={page}
							onClick={handleCloseNavMenu}
							component={Link}
							variant='text'
							to={pages[page]}>
							<Typography textAlign='center'>{page}</Typography>
						</MenuItem>
					))}
				</Menu>
			</Box>

			<Typography
				variant='Link'
				to='/'
				noWrap
				component='div'
				sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
				LOGO
			</Typography>

			<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
				{Object.keys(pages).map((page) => (
					<Button
						key={page}
						component={Link}
						to={pages[page]}
						variant='text'
						onClick={handleCloseNavMenu}
						sx={{ my: 2, color: '#2f2f2f', display: 'block' }}>
						{page}
					</Button>
				))}
			</Box>
		</>
	);
};

export default NavbarLeft;

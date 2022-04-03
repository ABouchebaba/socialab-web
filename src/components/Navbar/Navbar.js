import React from 'react';
import { AppBar, Toolbar, Container } from '@mui/material';
import NavbarLeft from './NavbarLeft';
import NavbarRight from './NavbarRight';

// import useStyles from './styles';

const Navbar = () => {
	// const classes = useStyles();

	return (
		<AppBar position='static' color='inherit' sx={{ mb: '30px' }}>
			<Container maxWidth='md'>
				<Toolbar disableGutters>
					<NavbarLeft />
					<NavbarRight />
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Navbar;

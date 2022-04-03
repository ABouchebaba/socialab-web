import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';

import { Container } from '@mui/material';

import { useDispatch } from 'react-redux';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Settings from './components/Settings/Settings';
import Profile from './components/Profile/Profile';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Notification from './components/Notification/Notification';

import { recoverCurrentUser } from './actions/auth';

const App = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		dispatch(recoverCurrentUser(history));
	}, [dispatch, history]);

	return (
		<BrowserRouter>
			<Notification />
			<Navbar />
			<Container maxWidth='md'>
				<Switch>
					<Route path='/' component={Home} exact />
					<Route path='/profile' component={Profile} exact />
					<Route path='/settings' component={Settings} exact />
					<Route path='/about' component={About} exact />
					<Route path='/contact' component={Contact} exact />
					<Route path='/auth' component={Auth} exact />
				</Switch>
			</Container>
		</BrowserRouter>
	);
};

export default App;

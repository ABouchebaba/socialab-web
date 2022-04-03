import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Snackbar } from '@mui/material';
import { dismiss } from '../../actions/notifications';

const Notification = () => {
	let notification = useSelector((state) => state.notifications);
	const dispatch = useDispatch();

	const handleClose = () => {
		dispatch(dismiss());
	};

	return (
		<>
			{notification && (
				<Snackbar
					open={!!notification}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
					autoHideDuration={6000}
					onClose={handleClose}>
					<Alert
						onClose={handleClose}
						severity={notification.type}
						variant='filled'
						sx={{ width: '100%' }}>
						{notification.message}
					</Alert>
				</Snackbar>
			)}
		</>
	);
};

export default Notification;

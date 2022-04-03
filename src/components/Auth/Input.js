import React, { useState } from 'react';
import { Grid, TextField, InputAdornment, IconButton } from '@material-ui/core';

import { Visibility, VisibilityOff } from '@mui/icons-material';

const Input = ({
	half,
	name,
	label,
	onChange,
	type,
	showPassword: showPasswordProp,
}) => {
	const [showPassword, setShowPassword] = useState(showPasswordProp);

	const handleShowPassword = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	};

	return (
		<Grid item xs={12} sm={half ? 6 : 12}>
			<TextField
				name={name}
				label={label}
				onChange={onChange}
				type={!showPassword && type === 'password' ? 'password' : 'text'}
				autoFocus
				variant='outlined'
				required
				fullWidth
				InputProps={
					name === 'password'
						? {
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton onClick={handleShowPassword}>
											{!showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								),
						  }
						: {}
				}
			/>
		</Grid>
	);
};

export default Input;

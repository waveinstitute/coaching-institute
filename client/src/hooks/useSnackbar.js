/** @format */
import React from 'react';

export function useSnackBar() {
	const [snackbarType, setSnackbarType] = React.useState('success');
	const [snackbar, setSnackbar] = React.useState(false);
	const [snackbarMessage, setSnackbarMessage] = React.useState('');

	const closeSnackBar = function () {
		setTimeout(() => {
			setSnackbar(false);
			setSnackbarMessage('');
			setSnackbarType('success');
		}, 5000);
	};

	const openSnackBar = (message, alertType = 'success') => {
		setSnackbar(true);
		setSnackbarMessage(message);
		setSnackbarType(alertType);
		closeSnackBar();
	};

	return { snackbar, openSnackBar, snackbarType, snackbarMessage };
}

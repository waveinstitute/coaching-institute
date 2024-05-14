/** @format */

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { handlePostReq, login, signup } from './apiFeatures.js';
import Cookies from 'js-cookie';
import CircularProgress from './material/CircularProgress.jsx';

export default function SignInform({ onSetSnackbar, onSetUser }) {
	const [open, setOpen] = React.useState(false);
	const [type, setType] = React.useState('login');

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div>
			<Button onClick={handleOpen}>sign in</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<Form>
					<FormHeader>
						{type === 'login' ? 'Welcom Back!' : 'Get Started Today!'}
					</FormHeader>
					<EntryForm
						type={type}
						onType={setType}
						onSetSnackbar={onSetSnackbar}
						onClose={handleClose}
						onSetUser={onSetUser}
					/>
				</Form>
			</Dialog>
		</div>
	);
}

function Form({ children }) {
	return (
		<div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
			{children}
		</div>
	);
}

function FormHeader({ children }) {
	return (
		<div className='mx-auto max-w-lg text-center'>
			<h1 className='text-2xl font-bold sm:text-3xl'>{children}</h1>

			<p className='mt-4 text-gray-500'>
				wave coaching institute is a trusted educational organization for JEE,
				Neet and Boards appearing aspirants
			</p>
		</div>
	);
}

function EntryForm({ type, onType, onSetSnackbar, onClose, onSetUser }) {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [name, setName] = React.useState('');
	const [passwordConfirm, setPasswordConfirm] = React.useState('');
	const [phone, setPhone] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(false);

	const signin = async function (e) {
		e.preventDefault();
		let data = {};
		data.email = email;
		data.password = password;
		if (type === 'signup') {
			data.name = name;
			data.passwordConfirm = passwordConfirm;
			data.phone = +phone;
		}
		let res;
		setIsLoading(true);
		if (type === 'signup') res = await signup(data);
		else res = await login(email, password);
		setIsLoading(false);

		if (res.status === 'success') {
			if (type === 'signup') {
				handlePostReq('/api/v1/email/signup', { email, username: name });
			}
			onSetSnackbar('you are logged in successfully', 'success');
			const token = res.token;
			onSetUser(res.data.user);
			Cookies.remove('jwt-token');
			Cookies.set('jwt-token', token, {
				// httpOnly: true,
				secure: true,
				expires: new Date().setDate(new Date().getDate() + 5),
			});
			onClose();
		} else onSetSnackbar(res.message || 'failed to login', 'error');
	};

	function changePhone(val) {
		const lastEl = +val[val.length - 1];
		if (val.length >= 12) return;
		if ((lastEl >= 0 && lastEl <= 9) || val == '') setPhone(val);
	}

	return (
		<>
			<form
				action='#'
				className='mx-auto mb-0 mt-8 max-w-md space-y-4'
			>
				{type === 'signup' && (
					<>
						<FormInput
							name='Name'
							type='text'
							icon='🧑'
							value={name}
							onValue={setName}
						/>
						<FormInput
							name='Phone'
							type='text'
							icon='📞'
							value={phone}
							onValue={changePhone}
						/>
					</>
				)}
				<FormInput
					name='Email'
					type='email'
					icon='📧'
					value={email}
					onValue={setEmail}
				/>
				<FormInput
					name='Password'
					type='password'
					icon='👁️'
					value={password}
					onValue={setPassword}
				/>

				{type === 'signup' && (
					<FormInput
						name='Password Confirm'
						type='password'
						icon='👁️'
						value={passwordConfirm}
						onValue={setPasswordConfirm}
					/>
				)}

				<FormFooter
					type={type}
					onType={onType}
					onLogin={signin}
					isLoading={isLoading}
				/>
			</form>
		</>
	);
}

function FormInput({ name, type, icon, value, onValue }) {
	return (
		<div>
			<label
				htmlFor={type}
				className='sr-only capitalize'
			>
				{name}
			</label>

			<div className='relative'>
				<input
					required
					value={value}
					onChange={(e) => onValue(e.target.value)}
					type={type}
					className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
					placeholder={`Enter ${name}`}
				/>

				<span className='absolute inset-y-0 end-0 grid place-content-center px-4'>
					{icon}
				</span>
			</div>
		</div>
	);
}

function FormFooter({ type, onType, onLogin, isLoading = false }) {
	return (
		<div className='flex items-center justify-between'>
			<p className='text-sm text-gray-500'>
				{type === 'login' ? 'No account?' : 'Already have an account?'}
				<button
					className='underline'
					value={type}
					onClick={() =>
						onType((curr) => (curr === 'login' ? 'signup' : 'login'))
					}
				>
					{type === 'signup' ? 'log in' : 'sign up'}
				</button>
			</p>

			{isLoading && <CircularProgress />}

			<button
				type='submit'
				onClick={onLogin}
				className='inline-block rounded-lg capitalize bg-blue-500 px-5 py-3 text-sm font-medium text-white'
			>
				{type === 'login' ? 'Log in' : 'sign up'}
			</button>
		</div>
	);
}

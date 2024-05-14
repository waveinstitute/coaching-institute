/** @format */
import { useState } from 'react';
import {
	handlePatchReq,
	handleImageUpload,
	// handlePostReq,
} from './../apiFeatures.js';
import Button from '@mui/material/Button';
import { useSnackBar } from '../hooks/useSnackbar.js';
import SnackBar from './../material/SnackBar.jsx';
import LoadingBar from 'react-top-loading-bar';

export default function AboutMe({ user }) {
	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.email);
	const [photo, setPhoto] = useState(user.photo);
	const [phone, setPhone] = useState(user.phone);
	const [currPassword, setCurrPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [upload, setUpload] = useState(null);
	const { snackbar, openSnackBar, snackbarType, snackbarMessage } =
		useSnackBar();
	const [progress, setProgress] = useState(0);

	async function changeUserData(e) {
		e.preventDefault();
		setProgress(60);
		const data = { name, email, photo, phone };
		const res = await handlePatchReq('/api/v1/users/updateMe', data);
		if (res.status === 'success') {
			openSnackBar('user data updated successfully', 'success');
		} else {
			console.log(res);
			openSnackBar('failed to upload', 'error');
		}
		setProgress(100);
	}

	async function changePassword(e) {
		e.preventDefault();
		setProgress(70);
		const res = await handlePatchReq('/api/v1/users/updatePassword', {
			currentPassword: currPassword,
			newPassword,
			passwordConfirm: confirmPassword,
		});
		setProgress(100);
		if (res.status === 'success') {
			openSnackBar('password updated successfully');
		} else {
			openSnackBar(`failed to update password | ${res.message}`, 'error');
		}
	}

	function uploadImage() {
		setProgress(30);
		if (!upload) {
			openSnackBar('please select an image', 'error');
			setProgress(100);
			return;
		}
		setProgress(70);
		handleImageUpload(upload)
			.then((res) => {
				if (res.status === 'success') {
					openSnackBar('Image uploaded successfully', 'success');
					setPhoto(res.data.url);
					setProgress(100);
				}
			})
			.catch((err) => {
				openSnackBar(err.message, 'error');
				setProgress(100);
			});
	}

	function changePhone(val) {
		const lastEl = +val[val.length - 1];
		if (val.length >= 12) return;
		if ((lastEl >= 0 && lastEl <= 9) || val == '') setPhone(val);
	}

	return (
		<div>
			<LoadingBar
				color='#f11946'
				progress={progress}
				onLoaderFinished={() => setProgress(0)}
			/>
			{snackbar && <SnackBar type={snackbarType}>{snackbarMessage}</SnackBar>}
			<div className='px-10 py-20 sm:p-32'>
				<h1 className='text-center text-3xl font-bold underline text-gray-700'>
					About me
				</h1>
				<form
					action=''
					onSubmit={changeUserData}
				>
					<div className='my-10 flex flex-col items-center justify-center gap-10 text-gray-600'>
						<img
							src={photo}
							className='m-auto h-10 w-10 object-cover rounded-full'
							alt=''
						/>
						<input
							type='file'
							onChange={(e) => setUpload(e.target.files[0])}
						/>
						<Button onClick={uploadImage}>upload</Button>
					</div>
					<div className='flex flex-col items-center gap-5'>
						<Input
							val={name}
							setVal={setName}
						>
							name
						</Input>
						<Input
							val={email}
							setVal={setEmail}
						>
							email
						</Input>
						<Input
							val={phone}
							setVal={changePhone}
						>
							phone
						</Input>
						<button
							className='select-none rounded-lg bg-gray-900 px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
							type='submit'
						>
							update
						</button>
					</div>
				</form>
			</div>
			<div className='px-10 py-20 sm:p-32'>
				<h1 className='text-center text-3xl font-bold underline text-gray-700'>
					Change Password
				</h1>
				<form
					action=''
					onSubmit={changePassword}
				>
					<div className='flex flex-col items-center gap-5 my-20'>
						<Input
							val={currPassword}
							setVal={setCurrPassword}
						>
							Current password
						</Input>
						<Input
							val={newPassword}
							setVal={setNewPassword}
						>
							New Password
						</Input>
						<Input
							val={confirmPassword}
							setVal={setConfirmPassword}
						>
							Confirm Password
						</Input>
						<button
							className='select-none rounded-lg bg-gray-900 px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
							type='submit'
						>
							update
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

function Input({ children, val, setVal }) {
	return (
		<div className='flex gap-10'>
			<div className='w-72'>
				<div className='relative h-10 w-full min-w-[200px]'>
					<input
						className='text-blue-gray-700 disabled:bg-blue-gray-50 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border-blue-gray-200 peer h-full w-full rounded-[7px] border border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0'
						placeholder=' '
						value={val}
						onChange={(e) => setVal(e.target.value)}
					/>
					<label className="peer-placeholder-shown:text-blue-gray-500 peer-disabled:peer-placeholder-shown:text-blue-gray-500 before:content[' '] after:content[' '] before:border-blue-gray-200 after:border-blue-gray-200 pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mr-1 before:mt-[6.5px] before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-l before:border-t before:transition-all after:pointer-events-none after:ml-1 after:mt-[6.5px] after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-r after:border-t after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-l-2 peer-focus:before:border-t-2 peer-focus:before:!border-gray-900 peer-focus:after:border-r-2 peer-focus:after:border-t-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent">
						{children}{' '}
					</label>
				</div>
			</div>
		</div>
	);
}

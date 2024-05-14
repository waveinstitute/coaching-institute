/** @format */

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import SnackBar from '../material/SnackBar';

import { Input } from '@material-tailwind/react';
import { useSnackBar } from '../hooks/useSnackbar';
import { handlePostReq } from '../apiFeatures.js';
import LoadingBar from 'react-top-loading-bar';
import { deleteTestimonial } from '../apiFeatures.js';

const Transition = React.forwardRef(function Transition(props, ref) {
	return (
		<Slide
			direction='up'
			ref={ref}
			{...props}
		/>
	);
});

export default function FullScreenDialog({
	data,
	onSave,
	onRemoveTestimonial,
}) {
	const { snackbar, openSnackBar, snackbarType, snackbarMessage } =
		useSnackBar();
	const [open, setOpen] = React.useState(false);
	const [imagePc, setImagePc] = React.useState(data.photo_pc);
	const [imageMob, setImageMob] = React.useState(data.photo_mob);
	const [name, setName] = React.useState(data.name);
	const [redirect, setRedirect] = React.useState(data.to);
	const [filePc, setFilePc] = React.useState(null);
	const [fileMob, setFileMob] = React.useState(null);
	const [progress, setProgress] = React.useState(0);

	async function handleSave() {
		const TestimonialData = {
			name,
			to: redirect,
			photo_pc: imagePc,
			photo_mob: imageMob,
			_id: data._id,
		};
		const res = await onSave(TestimonialData);
		if (res.status === 'success') {
			openSnackBar('Testimonial Updated Successfully');
		} else {
			openSnackBar(res.message || 'Failed to update Testimonial', 'error');
		}
	}

	async function handleImageUpload(type) {
		const formData = new FormData();
		if (type === 'pc') formData.append('file', filePc);
		else formData.append('file', fileMob);
		setProgress(70);
		const data = await handlePostReq('/api/v1/upload', formData);
		if (data.status === 'success') {
			openSnackBar('Image Uploaded Successfully');
			if (type === 'pc') setImagePc(data.data.res.url);
			else setImageMob(data.data.res.url);
		} else {
			openSnackBar(
				data.message || 'something went wrong, failed to upload image',
				'error'
			);
		}
		setProgress(100);
	}

	async function deleteData() {
		const res = await deleteTestimonial(data._id);
		if (res.status !== 'success')
			return openSnackBar(
				res.message || 'Failed to delete Testimonial',
				'error'
			);
		onRemoveTestimonial(data._id);
		handleClose();
	}

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<React.Fragment>
			<LoadingBar
				color='#f11946'
				progress={progress}
				onLoaderFinished={() => setProgress(0)}
			/>
			{snackbar && <SnackBar type={snackbarType}>{snackbarMessage}</SnackBar>}
			<Button
				variant='contained'
				color='inherit'
				onClick={handleClickOpen}
			>
				Edit
			</Button>
			<Dialog
				fullScreen
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<AppBar sx={{ position: 'relative' }}>
					<Toolbar>
						<IconButton
							edge='start'
							color='inherit'
							onClick={handleClose}
							aria-label='close'
						>
							<CloseIcon />
						</IconButton>
						<Typography
							sx={{ ml: 2, flex: 1 }}
							variant='h6'
							component='div'
						>
							Edit Carousel {data.name}
						</Typography>
						<Button
							autoFocus
							color='inherit'
							onClick={handleSave}
						>
							Save
						</Button>
						<Button
							autoFocus
							color='inherit'
							onClick={handleClose}
						>
							cancel
						</Button>
					</Toolbar>
				</AppBar>
				{/* write your code here */}
				<div className='py-20 px-40 flex justify-evenly'>
					<div>
						<InputWrapper label={'image (PC/laptop)'}>
							<img
								src={imagePc}
								className='h-72 w-72 object-cover'
								alt='preview of PC view image'
							/>
							<Input
								type='file'
								label='Laptop size image 16:9'
								onChange={(e) => {
									setFilePc(e.target.files[0]);
									// Update the course title here
								}}
							/>
							<Button onClick={() => handleImageUpload('pc')}>Upload</Button>
						</InputWrapper>
						<InputWrapper label={'image (mobile)'}>
							<img
								className='h-72 w-72 object-cover'
								src={imageMob}
								alt='preview of Mobile view image'
							/>
							<Input
								type='file'
								label='Mobile size image 3:2'
								onChange={(e) => {
									setFileMob(e.target.files[0]);
									// Update the course title here
								}}
							/>
							<Button onClick={() => handleImageUpload('mobile')}>
								Upload
							</Button>
						</InputWrapper>
						<InputWrapper label={'Name'}>
							<Input
								type='text'
								value={name}
								label='Name'
								onChange={(e) => {
									setName(e.target.value);
									// Update the course title here
								}}
							/>
						</InputWrapper>
						<InputWrapper label={'Redirect'}>
							<Input
								type='text'
								value={redirect}
								label='Redirect Route'
								onChange={(e) => {
									setRedirect(e.target.value);
								}}
							/>
						</InputWrapper>
						<Button
							color='error'
							variant='contained'
							onClick={deleteData}
						>
							Delete Carousel
						</Button>
					</div>
				</div>
			</Dialog>
		</React.Fragment>
	);
}

function InputWrapper({ children, label }) {
	return (
		<div className='w-72 my-10'>
			<h1 className='text-gray-500 my-5 uppercase text-sm ml-3'>
				Edit {label}
			</h1>
			{children}
		</div>
	);
}

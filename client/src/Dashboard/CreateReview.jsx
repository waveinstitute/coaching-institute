/** @format */
import { useState } from 'react';

import Rating from '@mui/material/Rating';
import { Textarea } from '@material-tailwind/react';
import { Button } from '@mui/material';
import SnackBar from '../material/SnackBar';
import { useSnackBar } from './../hooks/useSnackbar';
import { handlePostReq } from '../apiFeatures';

import Box from '@mui/material/Box';

import StarIcon from '@mui/icons-material/Star';

const labels = {
	0.5: 'Useless',
	1: 'Useless+',
	1.5: 'Poor',
	2: 'Poor+',
	2.5: 'Ok',
	3: 'Ok+',
	3.5: 'Good',
	4: 'Good+',
	4.5: 'Excellent',
	5: 'Excellent+',
};

function getLabelText(value) {
	return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

function HalfRating({ rating, onSetRating }) {
	const [hover, setHover] = useState(-1);

	return (
		<Box
			sx={{
				width: 200,
				display: 'flex',
				alignItems: 'center',
			}}
		>
			<Rating
				name='hover-feedback'
				value={rating}
				precision={0.5}
				getLabelText={getLabelText}
				onChange={(event, newValue) => {
					onSetRating(newValue);
				}}
				onChangeActive={(event, newHover) => {
					setHover(newHover);
				}}
				emptyIcon={
					<StarIcon
						style={{ opacity: 0.55 }}
						fontSize='inherit'
					/>
				}
			/>
			{rating !== null && (
				<Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>
			)}
		</Box>
	);
}

function TextareaDefault({ message, onSetMessage }) {
	return (
		<div className='w-96'>
			<Textarea
				variant='outlined'
				label='Message'
				value={message}
				onChange={(e) => onSetMessage(e.target.value)}
			/>
		</div>
	);
}

function Header() {
	return (
		<h1 className='text-2xl font-bold text-gray-800'>
			Write a Review about us and our courses
		</h1>
	);
}

function Footer({ onSubmitForm }) {
	return (
		<Button
			variant='contained'
			color='success'
			onClick={onSubmitForm}
		>
			Submit
		</Button>
	);
}

function CreateReview() {
	const { snackbar, openSnackBar, snackbarType, snackbarMessage } =
		useSnackBar();
	const [rating, setRating] = useState(0);
	const [message, setMessage] = useState('');

	async function submitForm() {
		if (rating === 0) {
			openSnackBar('Please select a rating', 'error');
			return;
		}

		if (message === '') {
			openSnackBar('Please write a message', 'error');
			return;
		}

		if (message.length < 20) {
			openSnackBar('Message should be atleast 20 characters long', 'error');
			return;
		}

		const data = {
			rating,
			review: message,
		};

		const response = await handlePostReq('/api/v1/review', data);

		if (response.status === 'success') {
			openSnackBar('Review submitted successfully', 'success');
		} else {
			openSnackBar(response.message && 'failed to post the review', 'error');
		}
	}

	return (
		<div className='flex flex-col gap-10 m-auto items-center pt-20'>
			{snackbar && <SnackBar type={snackbarType}>{snackbarMessage}</SnackBar>}
			<Header />
			<HalfRating
				rating={rating}
				onSetRating={setRating}
			/>
			<TextareaDefault
				message={message}
				onSetMessage={setMessage}
			/>
			<Footer onSubmitForm={submitForm} />
		</div>
	);
}
export default CreateReview;

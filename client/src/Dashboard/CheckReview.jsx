/** @format */

import { Button, Chip, Rating } from '@mui/material';
import Switch from '@mui/material/Switch';
import { handleGetReq, handleDeleteReq, handlePatchReq } from '../apiFeatures';
import { useEffect, useState } from 'react';
const label = { inputProps: { 'aria-label': 'Switch demo' } };

function CheckReview() {
	const [reviews, setReviews] = useState([]);
	useEffect(() => {
		async function getUser() {
			const data = await handleGetReq('/api/v1/review');
			if (data.status === 'success') setReviews(data.data.data);
		}
		getUser();
	}, []);
	return (
		<div>
			<h1 className='text-center text-3xl font-bold text-gray-600 my-10'>
				See All Reviews
			</h1>
			<div className='grid md:grid-cols-3 gap-5 justify-between mx-10 my-20'>
				{reviews.length === 0 && (
					<h1 className='text-center text-2xl font-bold text-gray-600'>
						No Reviews Found
					</h1>
				)}
				{reviews.length > 0 &&
					reviews.map((review) => (
						<Review
							key={review._id}
							review={review}
							onSetReviews={setReviews}
						/>
					))}
			</div>
		</div>
	);
}

function Review({ review, onSetReviews }) {
	const deleteReview = async () => {
		const data = await handleDeleteReq(`/api/v1/review/${review._id}`);
		if (data.status === 'success') {
			const data = await handleGetReq('/api/v1/review');
			if (data.status === 'success') onSetReviews(data.data.data);
		}
	};
	const toggleActive = async function () {
		const data = await handlePatchReq(`/api/v1/review/${review._id}`, {
			active: !review.active,
		});
		if (data.status === 'success') {
			const data = await handleGetReq('/api/v1/review');
			console.log(data.data.data);
			if (data.status === 'success') onSetReviews(data.data.data);
		}
	};
	return (
		<div className='bg-gray-100 rounded  p-5 flex flex-col gap-5'>
			<div className='flex text-gray-600 justify-between'>
				<h1 className='font-bold text-xl  capitalize'>
					{review.user.name.split(' ')[0]}
				</h1>
				{review.active ? (
					<Switch
						onClick={toggleActive}
						{...label}
						defaultChecked
					/>
				) : (
					<Switch
						onClick={toggleActive}
						{...label}
						value={true}
					/>
				)}
			</div>
			<div>
				<Rating
					name='read-only'
					precision={0.5}
					value={review.rating}
					readOnly
				/>
				<p className='text-gray-500'>{review.review}</p>
			</div>
			<div className={`flex justify-between align items-center`}>
				<Chip
					label={`${review.active ? 'active' : 'inactive'}`}
					color={`${review.active ? 'success' : 'error'}`}
					variant='filled'
					size='small'
				/>
				<Button
					variant='outlined'
					color='error'
					onClick={deleteReview}
				>
					Delete
				</Button>
			</div>
		</div>
	);
}

export default CheckReview;

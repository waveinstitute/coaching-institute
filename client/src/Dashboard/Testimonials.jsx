/** @format */
import { useState } from 'react';
import { useGetData } from '../hooks/useGetData.js';
import FullScreenDialog from './EditTestimonial.jsx';
import LoadingBar from 'react-top-loading-bar';
import AddNewTestimonial from './AddNewTestimonial.jsx';
import { handlePostReq, handlePatchReq } from '../apiFeatures.js';
// import { Link } from 'react-router-dom';

import {
	Card,
	CardHeader,
	CardBody,
	Typography,
} from '@material-tailwind/react';

export default function Testimonial() {
	const [progress, setProgress] = useState(0);
	const { data, error, onChangeData, onAddData } = useGetData(
		'/api/v1/testimonial'
	);

	async function onSave(testimonialData) {
		setProgress(60);
		const data = await handlePatchReq(
			`/api/v1/testimonial/${testimonialData._id}`,
			testimonialData
		);
		setProgress(80);
		if (data.status !== 'success') {
			setProgress(100);
			return data;
		}
		setProgress(100);
		onChangeData(data.data.data);

		return data;
	}

	async function onCreate(courseData) {
		setProgress(60);
		const data = await handlePostReq('/api/v1/testimonial', courseData);
		setProgress(80);
		console.log(data);
		if (data.status !== 'success') {
			setProgress(100);
			return data;
		}
		setProgress(100);
		onAddData(data.data.data);
		return data;
	}

	function removeTesimonial(_id) {
		onChangeData(_id);
	}

	return (
		<>
			<LoadingBar
				color='#CDE8E5'
				progress={progress}
				onLoaderFinished={() => setProgress(0)}
			/>

			<div className='sm:p-20 px-5 py-20'>
				{error && <div>{error}</div>}
				{data.length == 0 && (
					<>
						<h1 className='text-3xl text-center'>No carousel found</h1>
						<div className='flex justify-between w-full sm:px-32'>
							<div></div>
							<AddNewTestimonial onCreate={onCreate} />
						</div>
					</>
				)}
				{data.length > 0 && (
					<div className='flex flex-col gap-10 mx-auto items-center'>
						<div className='flex justify-between w-full sm:px-32'>
							<div></div>
							<AddNewTestimonial onCreate={onCreate} />
						</div>
						{data.map((testimonial, i) => (
							<HorizontalCard
								onSave={onSave}
								key={i}
								testimonial={testimonial}
								onRemoveTestimonial={removeTesimonial}
							/>
						))}
					</div>
				)}
			</div>
		</>
	);
}

function HorizontalCard({ testimonial, onSave, onRemoveTestimonial }) {
	return (
		<Card className='w-full max-w-[48rem] flex-row flex-wrap'>
			<CardHeader
				shadow={false}
				floated={false}
				className='m-0 w-full md:w-2/5 lg:w-1/3 rounded-r-none'
			>
				<img
					src={testimonial.photo_mob}
					alt={testimonial.name}
					className='h-72 w-72 object-cover'
				/>
			</CardHeader>
			<CardBody className='w-full md:w-3/5 lg:w-2/3'>
				<Typography
					variant='h6'
					color='gray'
					className='mb-4 uppercase'
				>
					{testimonial.name}
				</Typography>
				<Typography
					variant='h4'
					color='blue-gray'
					className='mb-2 text-sm sm:text-base md:text-lg lg:text-xl'
				>
					Status: {testimonial.active ? 'Active' : 'Inactive'}
				</Typography>
				<FullScreenDialog
					data={testimonial}
					onSave={onSave}
					onRemoveTestimonial={onRemoveTestimonial}
				/>
			</CardBody>
		</Card>
	);
}

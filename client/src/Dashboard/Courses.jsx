/** @format */
import { useState } from 'react';
import { useGetData } from '../hooks/useGetData.js';
import FullScreenDialog from './EditCourse.jsx';
import { updateCourse, postCourse } from '../apiFeatures.js';
import AddNewCourse from './AddNewCourse.jsx';
import LoadingBar from 'react-top-loading-bar';
import { Link } from 'react-router-dom';

import {
	Card,
	CardHeader,
	CardBody,
	Typography,
} from '@material-tailwind/react';

export default function Courses() {
	const { data, error, onChangeData, onAddData } = useGetData('/api/v1/course');
	const [progress, setProgress] = useState(0);

	async function uploadImage(file, _id) {
		const formData = new FormData();
		formData.append('file', file);
		formData._id = _id;
		const data = await updateCourse(formData);
		return data;
	}

	async function onSave(courseData) {
		setProgress(20);
		const data = await updateCourse(courseData);
		setProgress(40);
		if (data.status !== 'success') {
			setProgress(100);
			return data;
		}

		if (courseData.file instanceof File) {
			setProgress(60);
			const upload = await uploadImage(courseData.file, courseData._id);
			if (upload.status !== 'success') {
				setProgress(100);
				return upload;
			}
			onChangeData(upload.data.data);
		}
		setProgress(100);
		return data;
	}

	async function onCreate(courseData) {
		setProgress(20);
		const data = await postCourse(courseData);
		setProgress(40);
		if (data.status !== 'success') {
			setProgress(100);
			return data;
		}

		if (courseData.file instanceof File) {
			setProgress(60);
			const upload = await uploadImage(courseData.file, data.data.data._id);
			console.log({ upload });
			if (upload.status !== 'success') {
				setProgress(100);
				return upload;
			}
			onAddData(upload.data.data);
		}
		setProgress(100);
		return data;
	}

	function removeCourse(_id) {
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
						<h1 className='text-3xl text-center'>No course found</h1>
						<div className='flex justify-between w-full sm:px-32'>
							<div></div>
							<AddNewCourse onCreate={onCreate} />
						</div>
					</>
				)}
				{data.length > 0 && (
					<div className='flex flex-col gap-10 mx-auto items-center'>
						<div className='flex justify-between w-full sm:px-32'>
							<div></div>
							<AddNewCourse onCreate={onCreate} />
						</div>
						{data.map((course, i) => (
							<HorizontalCard
								onSave={onSave}
								key={i}
								course={course}
								onRemoveCourse={removeCourse}
							/>
						))}
					</div>
				)}
			</div>
		</>
	);
}

function HorizontalCard({ course, onSave, onRemoveCourse }) {
	return (
		<Card className='w-full max-w-[48rem] flex-row flex-wrap'>
			<CardHeader
				shadow={false}
				floated={false}
				className='m-0 w-full md:w-2/5 lg:w-1/3 rounded-r-none'
			>
				<Link to={`/course/${course._id}`}>
					<img
						src={course.courseOverview}
						alt={course.title}
						className='h-72 w-72 object-cover'
					/>
				</Link>
			</CardHeader>
			<CardBody className='w-full md:w-3/5 lg:w-2/3'>
				<Typography
					variant='h6'
					color='gray'
					className='mb-4 uppercase'
				>
					{course.stage}
				</Typography>
				<Typography
					variant='h4'
					color='blue-gray'
					className='mb-2 text-sm sm:text-base md:text-lg lg:text-xl'
				>
					{course.title}
				</Typography>
				<Typography
					color='gray'
					className='mb-8 font-normal text-sm sm:text-base md:text-lg lg:text-xl'
				>
					<span className='line-clamp-3 sm:line-clamp-4'>
						{course.description}
					</span>
				</Typography>
				<a
					href='#'
					className='inline-block'
				>
					<FullScreenDialog
						course={course}
						onSave={onSave}
						onRemoveCourse={onRemoveCourse}
					/>
				</a>
			</CardBody>
		</Card>
	);
}

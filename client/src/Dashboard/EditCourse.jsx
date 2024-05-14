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

import { Select, Option } from '@material-tailwind/react';
import { Input, Textarea } from '@material-tailwind/react';
import { useSnackBar } from '../hooks/useSnackbar';
import { deleteCourse } from '../apiFeatures';

const Transition = React.forwardRef(function Transition(props, ref) {
	return (
		<Slide
			direction='up'
			ref={ref}
			{...props}
		/>
	);
});

export default function FullScreenDialog({ course, onSave, onRemoveCourse }) {
	const [open, setOpen] = React.useState(false);
	const [title, setTitle] = React.useState(course.title);
	const [keyPoints, setKeyPoints] = React.useState(course.keyPoints);
	const [description, setDescription] = React.useState(course.description);
	const [intro, setIntro] = React.useState(course.intro);
	const [courseOverview, setCourseOverview] = React.useState(
		course.courseOverview
	);
	const [youtubeId, setYoutubeId] = React.useState(course.youtubeId);
	const [price, setPrice] = React.useState(course.price);
	const [discount, setDiscount] = React.useState(course.discount);
	const [loading, setLoading] = React.useState(true);
	const [stage, setStage] = React.useState(course.stage);
	const { snackbar, openSnackBar, snackbarType, snackbarMessage } =
		useSnackBar();
	const [file, setFile] = React.useState(null);
	const [percenctageCompleted, setPercentageCompleted] = React.useState(0);
	const [instructor, setInstructor] = React.useState(course.instructor || []);

	async function handleSave() {
		const courseData = {
			title,
			keyPoints,
			description,
			intro,
			courseOverview,
			youtubeId,
			price,
			discount,
			stage,
			file,
			_id: course._id,
			percenctageCompleted,
			instructor,
		};
		const data = await onSave(courseData);
		console.log(data);

		setLoading(false);
		if (data.status === 'success') {
			openSnackBar('Data changed Successfully');
		} else {
			openSnackBar(
				data.message || 'something went wrong, failed to change',
				'error'
			);
		}
	}

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	async function handleDeleteCourse() {
		const data = await deleteCourse(course);
		if (data.status === 'success') {
			openSnackBar('Course deleted Successfully');
			handleClose();
			onRemoveCourse(course._id);
		} else {
			openSnackBar(
				data.message || 'something went wrong, failed to delete',
				'error'
			);
		}
	}

	return (
		<React.Fragment>
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
							Edit {course.title}
						</Typography>
						<Button
							autoFocus
							color='inherit'
							onClick={handleSave}
						>
							save
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
					<div className=''>
						<InputWrapper label={'title'}>
							<Input
								type='text'
								value={title}
								label='Title'
								onChange={(e) => {
									const newTitle = e.target.value;
									setTitle(newTitle);
								}}
							/>
						</InputWrapper>
						{/* <InputWrapper label={'key points'}>
							{course.keyPoints.map((keyPoint, i) => (
								<Input
									type='text'
									key={i}
									value={keyPoint}
									label={`Key Point ${i + 1}`}
									onChange={(e) => {
										e.target.value;
										// Update the course title here
									}}
								/>
							))}
						</InputWrapper> */}
						<InputWrapper label={'key points'}>
							<AddInstuctor
								instructor={keyPoints}
								setInstructor={setKeyPoints}
							/>
						</InputWrapper>
						<InputWrapper label={'description'}>
							<Textarea
								type='text'
								value={description}
								label='Description'
								onChange={(e) => {
									setDescription(e.target.value);
									// Update the course title here
								}}
							/>
						</InputWrapper>
						<InputWrapper label={'Intro'}>
							<Textarea
								type='text'
								value={intro}
								label='intro'
								onChange={(e) => {
									setIntro(e.target.value);
									// Update the course title here
								}}
							/>
						</InputWrapper>
						<InputWrapper label={'stage'}>
							<Select
								label='Select stage'
								value={stage}
								onChange={(e) => setStage(e)}
							>
								<Option value='Draft'>Draft</Option>
								<Option value='Published'>Published</Option>
							</Select>
						</InputWrapper>
						<InputWrapper label={'Instructor'}>
							<AddInstuctor
								instructor={instructor}
								setInstructor={setInstructor}
							/>
						</InputWrapper>
					</div>
					<div>
						<img
							src={course.courseOverview}
							alt={course.title}
							className='h-52 w-52 object-cover rounded'
						/>
						<InputWrapper label={'overview image'}>
							<Input
								type='file'
								label='Course Overview'
								onChange={(e) => {
									setFile(e.target.files[0]);
								}}
							/>
						</InputWrapper>
						<InputWrapper label={'youtubeid'}>
							<Input
								type='text'
								value={youtubeId}
								label='Youtube id'
								onChange={(e) => {
									setYoutubeId(e.target.value);
									// Update the course title here
								}}
							/>
						</InputWrapper>
						<InputWrapper label={'price'}>
							<Input
								type='text'
								value={price}
								label='Price'
								onChange={(e) => {
									setPrice(e.target.value);
									// Update the course title here
								}}
							/>
						</InputWrapper>
						<InputWrapper label={'discount'}>
							<Input
								type='text'
								value={discount}
								label='Discount'
								onChange={(e) => {
									setDiscount(e.target.value);
									// Update the course title here
								}}
							/>
						</InputWrapper>
						<InputWrapper label={'Percentage Completed'}>
							<QuantityInput
								quantity={percenctageCompleted}
								setQuantity={setPercentageCompleted}
							/>
						</InputWrapper>

						<Button
							onClick={handleDeleteCourse}
							variant='contained'
							color='error'
						>
							Delete
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

const QuantityInput = ({ quantity, setQuantity }) => {
	const handleDecrement = () => {
		if (quantity - 5 > 0) {
			setQuantity((prevQuantity) => prevQuantity - 5);
		}
	};

	const handleIncrement = () => {
		if (quantity + 5 <= 100) setQuantity((prevQuantity) => prevQuantity + 5);
	};

	const handleChange = (e) => {
		const value = parseInt(e.target.value);
		if (!isNaN(value) && value >= 0 && value <= 100) {
			setQuantity(value);
		}
	};

	return (
		<div className='flex justify-center items-center space-x-2'>
			<button
				className='px-3 py-1 border rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none'
				onClick={handleDecrement}
			>
				-
			</button>
			<input
				type='number'
				value={quantity}
				onChange={handleChange}
				className='w-16 px-2 py-1 text-center border rounded'
			/>
			<button
				className='px-3 py-1 border rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none'
				onClick={handleIncrement}
			>
				+
			</button>
		</div>
	);
};

function AddInstuctor({ instructor, setInstructor }) {
	const [newInstructor, setNewInstructor] = React.useState('');

	function addInstuctor() {
		const str = newInstructor.trim();
		if (str.length < 3) return;
		setInstructor([...instructor, str]);
		setNewInstructor('');
	}
	function removeInstuctor(member) {
		setInstructor(instructor.filter((m) => m !== member));
	}

	return (
		<>
			<div className='flex flex-col gap-5 mb-5'>
				{instructor.map((inst, i) => (
					<div
						key={i}
						className='flex gap-5 justify-between'
					>
						<p>{inst}</p>
						<Button
							variant='outlined'
							color='error'
							onClick={() => removeInstuctor(inst)}
						>
							{' '}
							delete
						</Button>
					</div>
				))}
			</div>
			<div className='flex gap-5'>
				<Input
					type='text'
					value={newInstructor}
					label='add new'
					onChange={(e) => {
						setNewInstructor(e.target.value);
						// Update the course title here
					}}
				/>
				<Button
					variant='contained'
					color='success'
					onClick={addInstuctor}
				>
					Add
				</Button>
			</div>
		</>
	);
}

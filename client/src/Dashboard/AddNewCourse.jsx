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
import { updateCourse } from '../apiFeatures';
import SnackBar from '../material/SnackBar';

import { Select, Option } from '@material-tailwind/react';
import { Input, Textarea } from '@material-tailwind/react';
import { useSnackBar } from '../hooks/useSnackbar';
import DatePicker from './../material/DatePicker.jsx';

const Transition = React.forwardRef(function Transition(props, ref) {
	return (
		<Slide
			direction='up'
			ref={ref}
			{...props}
		/>
	);
});

export default function FullScreenDialog({ onCreate }) {
	const [open, setOpen] = React.useState(false);
	const [title, setTitle] = React.useState('');
	const [description, setDescription] = React.useState('');
	const [intro, setIntro] = React.useState('');
	const [courseOverview, setCourseOverview] = React.useState('test');
	const [youtubeId, setYoutubeId] = React.useState('');
	const [price, setPrice] = React.useState('');
	const [discount, setDiscount] = React.useState(0);
	const [loading, setLoading] = React.useState(true);
	const [stage, setStage] = React.useState('Draft');
	const { snackbar, openSnackBar, snackbarType, snackbarMessage } =
		useSnackBar();
	const [file, setFile] = React.useState();
	const [category, setCategory] = React.useState('Foundation');
	const [duration, setDuration] = React.useState(1);
	const [startsFrom, setStartFrom] = React.useState(new Date());
	const [instructor, setInstructor] = React.useState([]);
	const [keyPoints, setKeyPoints] = React.useState([]);

	async function handleSave() {
		const courseData = {
			title,
			keyPoints,
			description,
			intro,
			youtubeId,
			price,
			discount,
			courseOverview,
			stage,
			file,
			category,
			duration,
			startsFrom,
			instructor,
		};
		const data = await onCreate(courseData);

		setLoading(false);
		if (data.status === 'success') {
			openSnackBar('Course Created Successfully');
		} else {
			openSnackBar(
				data.message || 'something went wrong, failed to Create',
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

	return (
		<React.Fragment>
			{snackbar && <SnackBar type={snackbarType}>{snackbarMessage}</SnackBar>}
			<Button
				variant='contained'
				color='success'
				onClick={handleClickOpen}
			>
				New *
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
							Creat New Course
						</Typography>
						<Button
							autoFocus
							color='inherit'
							onClick={handleSave}
						>
							Create
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
						<InputWrapper label={'Stage'}>
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
						<InputWrapper label={'Category'}>
							<Select
								label='Select Category'
								value={category}
								onChange={(e) => setCategory(e)}
							>
								{[
									'Basic',
									'Advanced',
									'Competitive',
									'Foundation',
									'Other',
								].map((option, i) => (
									<Option
										key={i}
										value={option}
									>
										{option}
									</Option>
								))}
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
							src={courseOverview}
							alt={'courseOverview image'}
							className='h-52 w-52 object-cover rounded'
						/>
						<InputWrapper label={'overview image'}>
							<Input
								type='file'
								label='Course Overview'
								onChange={(e) => {
									setFile(e.target.files[0]);
									// Update the course title here
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
						<InputWrapper label={'Duration (in months)'}>
							<QuantityInput
								quantity={duration}
								setQuantity={setDuration}
							/>
						</InputWrapper>
						<InputWrapper label={'Course Start Date'}>
							<DatePicker setDate={setStartFrom} />
						</InputWrapper>
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
		if (quantity - 1 > 1) {
			setQuantity((prevQuantity) => prevQuantity - 1);
		}
	};

	const handleIncrement = () => {
		if (quantity + 1 <= 48) setQuantity((prevQuantity) => prevQuantity + 1);
	};

	const handleChange = (e) => {
		const value = parseInt(e.target.value);
		if (!isNaN(value) && value >= 1 && value <= 48) {
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

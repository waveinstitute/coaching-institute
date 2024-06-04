/** @format */

import { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import { CountUp } from 'countup.js';
import { Button } from '@mui/material';
import Carosoul from './Carosoul';
import Modal from './../material/Modal.jsx';
import Footer from '../component/Footer.jsx';
import { Link } from 'react-router-dom';
import PostSkeleton from './../material/PostSkeleton';
import { useGetCourses } from './../hooks/useGetData';
import { handlePostReq, handleGetReq } from '../apiFeatures.js';
import { useSnackBar } from './../hooks/useSnackbar.js';
import SnackBar from './../material/SnackBar.jsx';

const initTestimonial = [
	{
		src: '/student/boy1.jpg',
		name: 'rahul singh',
		field: 'JEE Aspirant',
		text: '"Wave has been a game-changer for me! The personalized attention from the faculty helped me grasp complex concepts easily. Thanks to their guidance, I aced my board exams with flying colors!"',
	},
	{
		src: '/student/boy2.jpg',
		name: 'raman yadav',
		field: 'Boards Aspirant',
		text: `"Wave turned my JEE dreams into reality! The institute's structured approach to learning, combined with regular doubt-clearing sessions, played a crucial role in my success. I couldn't have asked for a better coaching experience!"`,
	},
	{
		src: '/student/boy3.jpg',
		name: 'sandeep shukla',
		field: 'JEE Aspirant',
		text: `"Choosing Wave for my 11th-grade coaching was the best decision I made! The faculty members are not just teachers but mentors who go above and beyond to ensure every student understands the concepts thoroughly. I'm already feeling more prepared for the challenges ahead."`,
	},
];

export function Brand() {
	const el = useRef(null);

	useEffect(() => {
		const typed = new Typed(el.current, {
			strings: ['Boards.', 'Jee Mains.', 'Jee Advance.', 'foundation.'],
			typeSpeed: 100,
			loop: true,
			loopCount: Infinity,
		});

		return () => {
			// Destroy Typed instance during cleanup to stop animation
			typed.destroy();
		};
	}, []);

	return (
		<>
			<div className='max-w-screen-xl px-4 py-12 lg:px-8 mx-auto  text-gray-700 flex flex-col gap-8 text-center'>
				<h1 className='text-2xl md:text-5xl font-bold'>
					Ride the <span className='text-blue-600'>Wave</span> to{' '}
					<span ref={el} />
				</h1>
				<p className='w-[70%] m-auto'>
					Welcome to Wave, where we nurture potential, inspire excellence, and
					pave the way for your success in board exams and JEE mains. Our
					tailored coaching for 11th and 12th graders ensures every student
					thrives academically.
				</p>
			</div>
			<Stats />
			<InstructorProfile />
			<Courses />
			<Testimonial />
			<Contact />
			<Footer />
		</>
	);
}

function Stats() {
	return (
		<>
			<section className='bg-white'>
				<div className='mx-auto max-w-screen-xl px-4 py-12 lg:px-8'>
					<div className='mt-8 sm:mt-12 bg-gray-50 rounded-lg'>
						<dl className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
							<div className='flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center'>
								<dt className='order-last text-lg font-medium text-gray-500'>
									Total Hours Content
								</dt>

								<dd className='text-4xl font-extrabold text-blue-600 md:text-5xl'>
									<AnimatedStats
										duration={2}
										start={0}
										end={96}
										separator=','
									/>
									+
								</dd>
							</div>

							<div className='flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center'>
								<dt className='order-last text-lg font-medium text-gray-500'>
									Trusted Students
								</dt>

								<dd className='text-4xl font-extrabold text-blue-600 md:text-5xl'>
									<AnimatedStats
										duration={2}
										start={0}
										end={1024}
										separator=','
									/>
									+
								</dd>
							</div>

							<div className='flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center'>
								<dt className='order-last text-lg font-medium text-gray-500'>
									courses
								</dt>

								<dd className='text-4xl font-extrabold text-blue-600 md:text-5xl'>
									<AnimatedStats
										duration={2}
										start={0}
										end={8}
										separator=','
									/>
									+
								</dd>
							</div>
						</dl>
					</div>
				</div>
			</section>
		</>
	);
}

function AnimatedStats({ start, end, duration, separator }) {
	const statsRef = useRef(null);

	useEffect(() => {
		const countUp = new CountUp(statsRef.current, end, {
			startVal: start,
			duration: duration,
			separator: separator,
		});

		if (!countUp.error) {
			countUp.start();
		} else {
			console.error(countUp.error);
		}
	}, [start, end, duration, separator]);

	return <span ref={statsRef}></span>;
}

function Courses() {
	const { courses, error, loading } = useGetCourses();
	return (
		<>
			<div
				id='courses'
				className='mx-auto max-w-screen-xl px-4 py-12 lg:px-8'
			>
				<div className='mt-8 sm:mt-12 bg-gray-50 rounded-lg text-gray-700 md:p-10 p-1 m-auto'>
					<h1 className='text-3xl md:text-5xl font-bold underline mb-10'>
						Our Courses&rarr;
					</h1>
					<div className='grid md:grid-cols-3 grid-cols-1 gap-10 md:text-base text-sm'>
						{loading && (
							<>
								<PostSkeleton loading={loading} />
								<PostSkeleton loading={loading} />
								<PostSkeleton loading={loading} />
							</>
						)}{' '}
						{error && <h1 className='text-center text-red-500'>{error}</h1>}
						{courses.length == 0 && !error && (
							<h1 className='text-center text-red-500'>No course available</h1>
						)}
						{courses.length !== 0 && (
							<>
								{courses.map(
									(course, i) =>
										i < 3 && (
											<Card
												data={course}
												key={course._id}
											/>
										)
								)}
							</>
						)}
						{/* <Card data={courseList[0]} />
						<Card data={courseList[1]} />
						<Card data={courseList[2]} /> */}
					</div>
					<div className='mx py-10 flex md:justify-end justify-center'>
						<Link to='/course'>
							<Button
								variant='contained'
								color='primary'
								size='large'
							>
								See All
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}

export function Card({ data }) {
	return (
		<article className='overflow-hidden rounded-lg shadow transition hover:shadow-lg'>
			<Link to={`/course/${data._id}`}>
				<img
					alt=''
					src={data.courseOverview}
					className='h-56 w-full object-cover'
				/>
			</Link>

			<div className='bg-white p-4 sm:p-6'>
				<time
					dateTime='2022-10-10'
					className='block text-xs text-gray-500'
				>
					Start From{' '}
					{data.startsFrom &&
						new Intl.DateTimeFormat('en-US', {
							day: '2-digit',
							month: 'short',
							year: 'numeric',
						}).format(new Date(data.startsFrom))}
				</time>

				<a href='#'>
					<h3 className='mt-0.5 text-lg text-gray-900'>{data.title}</h3>
				</a>

				<p className='mt-2 line-clamp-3 text-sm/relaxed text-gray-500'>
					{data.description}
				</p>
				<div className='flex justify-between mt-5'>
					<p>
						<span className='line-through'>₹{data.price}</span>
						<span className=''>
							₹{(data.price - (data.price * data.discount) / 100).toFixed(2)}/-
						</span>
					</p>
					<Button variant='text'>Enroll now</Button>
				</div>
			</div>
		</article>
	);
}

function Testimonial() {
	const [screenSize, setScreenSize] = useState(window.innerWidth);
	const [reviews, setReviews] = useState([]);
	window.addEventListener('resize', function () {
		setScreenSize(window.innerWidth);
	});

	useEffect(() => {
		async function getReviews() {
			const data = await handleGetReq('/api/v1/review');
			if (data.status === 'success')
				setReviews(() => {
					const reviews = data.data.data;
					const activeReview = reviews.filter((review) => review.active);
					return activeReview;
				});
			else setReviews(initTestimonial);
		}
		getReviews();
	}, []);

	return (
		<>
			<div
				id='testimonials'
				className='mx-auto max-w-screen-xl px-4 py-12 lg:px-8'
			>
				<div className='mt-8 sm:mt-12 bg-gray-50 rounded-lg text-gray-700 md:p-10 p-1 m-auto'>
					{/* <div className="grid md:grid-cols-3 grid-cols-1 gap-10 md:text-base text-sm"> */}
					<Carosoul
						items={screenSize > 700 ? 3 : 1}
						dots={false}
					>
						{reviews.map((review, i) => (
							<TestimonialCard
								data={review}
								key={i}
							/>
						))}
					</Carosoul>
					{/* </div> */}
				</div>
			</div>
		</>
	);
}

function TestimonialCard({ full = false, data }) {
	return (
		<>
			<article className='rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-lg sm:p-6'>
				<div className='flex gap-5'>
					<div className='h-14 w-14 '>
						<img
							src={data.user.photo}
							className='rounded-full object-cover h-14 w-14'
							alt={`${data.field} | ${data.user.name}`}
						/>
					</div>
					<div>
						<h1 className='capitalize text-xl font-bold'>
							@{data.user.name.split(' ')[0]}
						</h1>
						<p className='text-gray-400 text-sm font-semibold'>
							(⭐{data.rating} Rating)
						</p>
					</div>
				</div>

				<p
					className={`mt-2 ${
						full ? '' : 'line-clamp-3'
					} text-sm/relaxed text-gray-500`}
				>
					{data.review}
				</p>
				{!full && (
					<Modal text='read more'>
						<TestimonialCard
							full={true}
							data={data}
						/>
					</Modal>
				)}

				{/* <a href="#courses" className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
            Find out more

            <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 rtl:rotate-180">
            &rarr;
            </span>
        </a> */}
			</article>
		</>
	);
}

export function Contact() {
	const { snackbar, openSnackBar, snackbarType, snackbarMessage } =
		useSnackBar();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [message, setMessage] = useState('');
	// const [div, setDiv] = useState('');

	async function sendEnquiry(e) {
		e.preventDefault();
		if (!message && !email) return;
		const data = await handlePostReq('/api/v1/email/sendEnquiry', {
			name,
			email,
			phone,
			message,
		});
		if (data.status === 'success') {
			openSnackBar('enquiry send successfully', 'success');
		} else {
			openSnackBar('failed to send email', 'error');
		}
	}
	function changePhone(val) {
		const lastEl = +val[val.length - 1];
		if (val.length >= 12) return;
		if ((lastEl >= 0 && lastEl <= 9) || val == '') setPhone(val);
	}

	return (
		<section className='mx-auto max-w-screen-xl px-4 py-12 lg:px-8'>
			{snackbar && <SnackBar type={snackbarType}>{snackbarMessage}</SnackBar>}
			<div className='mx-auto mt-8 bg-gray-50 sm:mt-12 rounded-lg text-gray-700 md:p-10'>
				<div className='grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5'>
					<div className='lg:col-span-2 lg:py-12'>
						<p className='max-w-xl text-lg'>
							Have questions or need more information? We&apos;re here to help!
							Reach out to us at Wave for any inquiries about our programs,
							schedules, or enrollment. Our team is ready to assist you on your
							journey to academic success. Contact us today and let&apos;s start
							the conversation!
						</p>

						<div className='mt-8'>
							<a
								href='#'
								className='text-2xl font-bold text-pink-600'
							>
								{' '}
								8318 015 051{' '}
							</a>

							<address className='mt-2 not-italic'>
								Kalyanpur Kanput, Uttar pradash, PIN 208017
							</address>
						</div>
					</div>

					<div className='rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12'>
						<form
							action='#'
							className='space-y-4'
						>
							<div>
								<label
									className='sr-only'
									htmlFor='name'
								>
									Name
								</label>
								<input
									className='w-full rounded-lg border-gray-200 p-3 text-sm'
									placeholder='Name'
									type='text'
									id='name'
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>

							<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
								<div>
									<label
										className='sr-only'
										htmlFor='email'
									>
										Email
									</label>
									<input
										className='w-full rounded-lg border-gray-200 p-3 text-sm'
										placeholder='Email address'
										type='email'
										id='email'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>

								<div>
									<label
										className='sr-only'
										htmlFor='phone'
									>
										Phone
									</label>
									<input
										className='w-full rounded-lg border-gray-200 p-3 text-sm'
										placeholder='Phone Number'
										type='tel'
										id='phone'
										value={phone}
										onChange={(e) => changePhone(e.target.value)}
									/>
								</div>
							</div>

							<div className='grid grid-cols-1 gap-4 text-center sm:grid-cols-3'>
								<div>
									<label
										htmlFor='Option1'
										className='block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white'
										tabIndex='0'
									>
										<input
											className='sr-only'
											id='Option1'
											type='radio'
											tabIndex='-1'
											name='option'
										/>

										<span className='text-sm'> Class 11 </span>
									</label>
								</div>

								<div>
									<label
										htmlFor='Option2'
										className='block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white'
										tabIndex='0'
									>
										<input
											className='sr-only'
											id='Option2'
											type='radio'
											tabIndex='-1'
											name='option'
										/>

										<span className='text-sm'> Class 12 </span>
									</label>
								</div>

								<div>
									<label
										htmlFor='Option3'
										className='block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white'
										tabIndex='0'
									>
										<input
											className='sr-only'
											id='Option3'
											type='radio'
											tabIndex='-1'
											name='option'
										/>

										<span className='text-sm'> Dropper </span>
									</label>
								</div>
							</div>

							<div>
								<label
									className='sr-only'
									htmlFor='message'
								>
									Message
								</label>

								<textarea
									className='w-full rounded-lg border-gray-200 p-3 text-sm'
									placeholder='Message'
									rows='8'
									id='message'
									value={message}
									onChange={(e) => setMessage(e.target.value)}
								></textarea>
							</div>

							<div className='mt-4'>
								<button
									type='submit'
									className='inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto'
									onClick={sendEnquiry}
								>
									Send Enquiry
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}

export function InstructorProfile() {
	const instructors = [
		{
			name: 'prach khare',
			desc: `Prachi Khare is renowned as one of the best NEET and JEE chemistry
	teachers, recognized for her exceptional teaching skills and
	dedication to her students success. With her comprehensive knowledge
	of chemistry and effective teaching methods, she has empowered
	countless students to excel in their exams. Prachi Khare ability to
	simplify complex concepts, coupled with her passion for teaching,
	makes her classes engaging and fruitful. Students not only appreciate
	her expertise but also admire her commitment to guiding them towards
	academic excellence.`,
			subject: 'chemistry',
			src: '/instructor/prachi.jpeg',
		},
		{
			name: 'amit khare',
			desc: `Amit Khare is renowned as one of the best NEET and JEE chemistry
	teachers, recognized for her exceptional teaching skills and
	dedication to her students success. With her comprehensive knowledge
	of chemistry and effective teaching methods, she has empowered
	countless students to excel in their exams. Prachi Khare ability to
	simplify complex concepts, coupled with her passion for teaching,
	makes her classes engaging and fruitful. Students not only appreciate
	her expertise but also admire her commitment to guiding them towards
	academic excellence.`,
			subject: 'physics',
			src: '/instructor/amit.jpeg',
		},
	];
	return (
		<>
			<div
				id='instructor'
				className='mx-auto max-w-screen-xl px-4 py-12 lg:px-8'
			>
				<div className='mt-8 sm:mt-12 bg-gray-50 rounded-lg text-gray-700 md:p-10 p-1 m-auto'>
					{/* <div className="grid md:grid-cols-3 grid-cols-1 gap-10 md:text-base text-sm"> */}
					<Carosoul
						items={1}
						dots={false}
					>
						{instructors.map((instructor, i) => (
							<ProfileCard
								data={instructor}
								key={i}
							/>
						))}
					</Carosoul>
					{/* </div> */}
				</div>
			</div>
		</>
	);
}

export function ProfileCard({ data }) {
	return (
		<div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 m-auto shadow-md w-full max-w-[48rem] sm:flex-row'>
			<div className='relative w-full sm:w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0'>
				<img
					src={data.src}
					alt='card-image'
					className='object-cover w-full h-64 sm:h-80 md:h-96 m-auto'
				/>
			</div>
			<div className='p-6'>
				<h6 className='block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase'>
					Instructor
				</h6>
				<h4 className='block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 capitalize'>
					{data.name} ({data.subject} Expert)
				</h4>
				<p className='line-clamp-5 mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700'>
					{data.desc}
				</p>
				<div className='inline-block'>
					<button
						className='flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20'
						type='button'
					>
						<Star /> <span className='whitespace-nowrap'>5 Star faculty</span>
					</button>
				</div>
			</div>
		</div>
	);
}

function Star() {
	return (
		<div className='grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg py-6 lg:overflow-visible'>
			<div className='inline-flex items-center'>
				<span className='flex'>
					{Array.from([1, 2, 3, 4, 5]).map((el) => (
						<svg
							key={el}
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='currentColor'
							className='w-6 h-6 text-yellow-400 cursor-pointer'
						>
							<path
								fillRule='evenodd'
								d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
								clipRule='evenodd'
							></path>
						</svg>
					))}
				</span>
			</div>
		</div>
	);
}

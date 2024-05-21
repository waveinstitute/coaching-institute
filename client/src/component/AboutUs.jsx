/** @format */
import Header from '../Header';
import Footer from './Footer';
import { InstructorProfile } from '../home/MiniComponent';
import { Contact } from '../home/MiniComponent';
import { Link } from 'react-router-dom';

function AboutUs() {
	return (
		<div>
			<Header></Header>
			<Description></Description>
			<InstructorProfile></InstructorProfile>
			<Contact></Contact>
			<Footer></Footer>
		</div>
	);
}

function Description() {
	return (
		<section className='bg-white'>
			<div className='gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6'>
				<div className='font-light text-gray-500 sm:text-lg'>
					<div className='font-medium text-purple-600'>
						<Link to='/'>Home</Link>/<Link to='/about'>About</Link>
					</div>
					<h2 className='mb-4 text-4xl tracking-tight font-extrabold text-gray-900'>
						Empowering Students for Success
					</h2>
					<p className='mb-4'>
						At our coaching institute, we are dedicated to empowering students
						to excel academically. With our comprehensive curriculum,
						experienced faculty, and personalized approach, we prepare students
						for success in board exams and competitive entrance tests like JEE
						mains. Let us be your partner in achieving academic excellence and
						realizing your full potential.
					</p>
					<p>
						Join us today and embark on a journey towards a brighter future.
					</p>
				</div>
				<div className='grid grid-cols-2 gap-4 mt-8'>
					<img
						className='w-full rounded-lg'
						src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png'
						alt='office content 1'
					/>
					<img
						className='mt-4 w-full lg:mt-10 rounded-lg'
						src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png'
						alt='office content 2'
					/>
				</div>
			</div>
		</section>
	);
}
export default AboutUs;

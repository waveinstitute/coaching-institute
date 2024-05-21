/** @format */
import { Contact } from '../home/MiniComponent';
import { InstructorProfile } from '../home/MiniComponent';
import Header from '../Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';

function ContactUs() {
	return (
		<div>
			<Header />
			<div className='px-32 mt-32 text-purple-600'>
				<Link to='/'>Home</Link>/<Link to='/contact'>Contact</Link>
			</div>
			<Contact />
			<InstructorProfile />
			<Footer />
		</div>
	);
}

export default ContactUs;

/** @format */

import Courses from './Course.jsx';
import WhyChooseUs from './WhyChooseUs.jsx';
import Header from '../Header.jsx';
import Hero from './Hero.jsx';
import Pricing from './Pricing.jsx';
import { useGetData } from '../hooks/useGetData.js';
import { useParams } from 'react-router-dom';
import NotFound from './NotFound.jsx';

export default function AboutUs() {
	const { id } = useParams();
	const { data, error } = useGetData('/api/v1/course', id);

	return (
		<>
			{error ? (
				<NotFound />
			) : (
				<>
					<Header />
					<Hero data={data} />
					<Courses data={data} />
					<WhyChooseUs />
					<Pricing data={data} />
				</>
			)}
		</>
	);
}

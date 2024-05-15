/** @format */

import { useEffect, useState } from 'react';
import Header from './Header.jsx';
import Carosoul from './home/Carosoul.jsx';
import { Brand } from './home/MiniComponent.jsx';
import { useTitle } from './hooks/useTitle.js';
import { getTestimonial } from './apiFeatures.js';

function Item({ data }) {
	const [screenSize, setScreenSize] = useState(window.innerWidth);

	window.addEventListener('resize', function () {
		setScreenSize(window.innerWidth);
	});

	return (
		<>
			<div className='item'>
				<a href={data.to}>
					<img
						src={screenSize > 700 ? data.photo_pc : data.photo_mob}
						alt={data.name}
					/>
				</a>
			</div>
		</>
	);
}

export default function App() {
	useTitle('Expert Online Coaching for IIT JEE, NEET, Foundations');
	const [testimonial, setTestimonial] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const res = await getTestimonial();
			if (res.status == 'success') {
				setTestimonial(() => {
					return res.data.data;
				});
			}
		}
		fetchData();
	}, []);

	return (
		<>
			<Header />
			{testimonial.length !== 0 && (
				<Carosoul>
					{testimonial.map((el, i) => (
						<Item
							data={el}
							key={i}
						/>
					))}
				</Carosoul>
			)}
			<Brand />
		</>
	);
}

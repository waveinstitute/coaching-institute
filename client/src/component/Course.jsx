/** @format */

import { Typography, Card, CardBody } from '@material-tailwind/react';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';

function FeatureCard({ icon: Icon, title, children }) {
	return (
		<Card
			color='transparent'
			shadow={false}
		>
			<CardBody className='grid place-items-start px-0'>
				<div className='mb-3 grid place-content-center rounded-lg text-left text-blue-gray-900'>
					<Icon className='h-6 w-6' />
				</div>
				<Typography
					variant='h5'
					color='blue-gray'
					className='mb-2'
				>
					{title}
				</Typography>
				<Typography className='text-gray-500 font-normal'>
					{children}
				</Typography>
			</CardBody>
		</Card>
	);
}

export default function Courses({ data }) {
	return (
		<section className='py-28 px-8'>
			<div className='container mx-auto grid grid-cols-1 place-items-center lg:grid-cols-3'>
				<div className='col-span-1 rounded-xl lg:mb-0 mb-12'>
					<img
						height={'360px'}
						width={'300px'}
						src={data.courseOverview}
						className='h-[360px] max-h-[500px] w-[300px] object-cover scale-110'
						alt='online course'
					/>
				</div>
				<div className='col-span-2 lg:pl-24'>
					<Typography
						variant='h2'
						color='blue-gray'
						className='mb-4'
					>
						{data.title}
					</Typography>
					<Typography
						variant='lead'
						className='mb-5 max-w-lg px-4 text-left text-lg !text-gray-500 lg:px-0  '
					>
						{data.intro}
					</Typography>

					<div className='col-span-2 grid grid-cols-1 gap-10 sm:grid-cols-3 '>
						{data.keyPoints?.map((el, i) => (
							<FeatureCard
								key={i}
								icon={CheckBadgeIcon}
								title={el}
							></FeatureCard>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

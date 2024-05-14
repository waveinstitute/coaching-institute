/** @format */

import React from 'react';
import { Typography } from '@material-tailwind/react';
import {
	ChartPieIcon,
	CloudArrowDownIcon,
	CloudIcon,
	Cog6ToothIcon,
	KeyIcon,
	UsersIcon,
} from '@heroicons/react/24/solid';

function BackgroundCard({ title, children }) {
	return (
		<div className='grid place-items-center h-full px-8 py-6 bg-gray-900 rounded-xl'>
			<div>
				<Typography
					variant='h2'
					className='text-center'
					color='white'
				>
					{title}
				</Typography>
				<Typography
					color='white'
					className='my-2 text-base w-full text-center font-normal'
				>
					{children}
				</Typography>
			</div>
		</div>
	);
}

function Option({ icon: Icon, title, children }) {
	return (
		<div className='flex gap-4'>
			<div className='mb-4'>
				<Icon className='text-gray-900 h-6 w-6' />
			</div>
			<div>
				<Typography
					variant='h5'
					color='blue-gray'
					className='mb-2'
				>
					{title}
				</Typography>
				<Typography className='mb-2 md:w-10/12 font-normal !text-gray-500'>
					{children}
				</Typography>
			</div>
		</div>
	);
}

function WhyChooseUs() {
	return (
		<section className='w-full max-w-4xl mx-auto flex flex-col items-center px-4 py-10'>
			<Typography
				variant='h2'
				className='text-center mb-2'
				color='blue-gray'
			>
				Why choose our course?
			</Typography>
			<Typography
				variant='lead'
				className='mb-16 w-full text-center font-normal !text-gray-500 lg:w-10/12'
			>
				Discover the unique advantages, benefits, and standout features that set
				our course apart from the rest.
			</Typography>
			<div className='mt-8'>
				<div className='grid grid-cols-1 items-center md:grid-cols-2 gap-12 mb-24'>
					<BackgroundCard title='Alumni Success Stories'>
						Share success stories of past students who have benefited from your
						coaching institute, inspiring potential students with real-life
						examples of achievement.
					</BackgroundCard>
					<div className='space-y-8'>
						<div className='my-4'>
							<Option
								icon={CloudIcon}
								title='Expert Faculty'
							>
								Highlight the qualifications and experience of your faculty
								members, emphasizing their expertise in teaching board exam and
								JEE main subjects.
							</Option>
						</div>
						<div className='mb-4 flex gap-4'>
							<Option
								icon={ChartPieIcon}
								title='Personalized Attention'
							>
								Mention how your institute provides personalized attention to
								each student, ensuring their individual academic needs are met
								effectively.
							</Option>
						</div>
						<Option
							icon={Cog6ToothIcon}
							title='Comprehensive Study Materials'
						>
							Describe the quality and relevance of the study materials provided
							by your institute, including textbooks, practice papers, and
							online resources.
						</Option>
					</div>
				</div>
				<div className='grid grid-cols-1 items-center md:grid-cols-2 gap-12 mb-24'>
					<div className='space-y-8'>
						<div className='my-4'>
							<Option
								icon={KeyIcon}
								title='Proven Track Record'
							>
								Showcase the institute's track record of success, such as high
								pass rates in board exams and impressive JEE main scores
								achieved by past students.
							</Option>
						</div>
						<div className='mb-4 flex gap-4'>
							<Option
								icon={UsersIcon}
								title='Interactive Learning Environment'
							>
								Emphasize the interactive and engaging learning environment at
								your institute, which encourages active participation and
								fosters a deeper understanding of concepts.
							</Option>
						</div>
						<Option
							icon={CloudArrowDownIcon}
							title='Focus on Conceptual Clarity'
						>
							Stress the institute's focus on building strong conceptual
							foundations in subjects like Mathematics, Physics, and Chemistry,
							essential for success in board exams and competitive exams like
							JEE main.
						</Option>
					</div>
					<BackgroundCard title='Holistic Development'>
						Discuss how your institute aims to foster not only academic
						excellence but also the overall development of students, including
						soft skills and problem-solving abilities.
					</BackgroundCard>
				</div>
			</div>
		</section>
	);
}

export default WhyChooseUs;

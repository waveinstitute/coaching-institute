/** @format */

import { Typography, Button, Input } from '@material-tailwind/react';

const LINKS = [
	{
		title: 'Company',
		items: [
			{ name: 'About us', to: '/about' },
			{ name: 'Contact us', to: '/contact' },
			{ name: 'Join us', to: '/contact' },
		],
	},
	{
		title: 'Pages',
		items: [
			{ name: 'Courses', to: 'course' },
			{ name: 'JEE', to: '/course/663639cc6e9a8379662db32c' },
			{ name: 'NEET', to: '/course/6636ae2ab72e342b171f901c' },
		],
	},
	{
		title: 'Social',
		items: [
			{ name: 'facebook', to: 'https://facebook.com' },
			{ name: 'twitter', to: 'https://x.com/amitKha24659569' },
			{
				name: 'Linked in',
				to: 'https://www.linkedin.com/in/wave-institute-b547ab310/',
			},
		],
	},
];

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
	return (
		<footer className='px-8 pt-24 pb-8'>
			<div className='container max-w-6xl flex flex-col mx-auto'>
				<div className='grid grid-cols-1 lg:grid-cols-3 !w-full '>
					<div className='flex col-span-2 items-center gap-10 mb-10 lg:mb-0 md:gap-36'>
						{LINKS.map(({ title, items }) => (
							<ul key={title}>
								<Typography
									variant='h6'
									color='blue-gray'
									className='mb-4'
								>
									{title}
								</Typography>
								{items.map(({ name, to }, i) => (
									<li key={i}>
										<Typography
											as='a'
											href={to}
											className='py-1 font-normal !text-gray-700 transition-colors hover:!text-gray-900'
										>
											{name}
										</Typography>
									</li>
								))}
							</ul>
						))}
					</div>
					<div className=''>
						<Typography
							variant='h6'
							className='mb-3 text-left'
						>
							Subscribe
						</Typography>
						<Typography className='!text-gray-500 font-normal mb-4 text-base'>
							Get access to subscriber exclusive deals and be the first who gets
							informed about fresh sales.
						</Typography>
						<Typography
							variant='small'
							className='font-medium mb-2 text-left'
						>
							Your Email
						</Typography>
						<div className='flex mb-3 flex-col lg:flex-row items-start gap-4'>
							<div className='w-full'>
								<Input
									label='Email'
									color='gray'
								/>
							</div>
							<Button
								color='gray'
								className='w-full lg:w-fit'
								size='md'
							>
								button
							</Button>
						</div>
					</div>
				</div>
				<Typography
					color='blue-gray'
					className='md:text-center mt-16 font-normal !text-gray-700'
				>
					&copy; {CURRENT_YEAR} Made with ❤️ by{' '}
					<a
						href='https://adarshsingh7.github.io/adizio'
						target='_blank'
					>
						Adizio
					</a>
					.
				</Typography>
			</div>
		</footer>
	);
}

export default Footer;

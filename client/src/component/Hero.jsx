/** @format */
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Hero({ data }) {
	return (
		<div className='relative w-full'>
			<div className='bg-[#2D2F31] text-white'>
				<div className='justify-between px-5 py-20 flex flex-col sm:flex-row-reverse gap-5 sm:px-20'>
					{/* embedding */}
					<div className='flex flex-col gap-10 justify-center'>
						<div className='h-[250px] sm:min-w-[400px] sm:max-w-[50%]'>
							<iframe
								className='h-full w-full'
								src={`https://www.youtube.com/embed/${data?.youtubeId}`}
								title='YouTube video player'
								frameBorder='0'
								allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
								allowFullScreen
							></iframe>
						</div>
						<div className='flex justify-between'>
							<p className='font-bold text-green-600 text-xl'>
								<span className='line-through'>₹{data.price}</span>
								<span className=''>
									₹
									{(data.price - (data.price * data.discount) / 100).toFixed(2)}
									/-
								</span>
							</p>
							<Button variant='contained'>Buy Now</Button>
						</div>
					</div>

					<div className='flex flex-col gap-7 sm:px-20'>
						<p className='text-purple-500 cursor-pointer'>
							<Link to='/'>Hero</Link> / <Link to='/course'>Courses</Link> / DSA
						</p>
						<h1 className='text-2xl font-bold md:text-3xl'>{data.title}</h1>
						<p className='text-sm md:text-xl'>{data.description}</p>
						<div className='flex flex-col gap-3 text-sm'>
							<div>
								<span className='rounded bg-green-600 p-0.5 text-xs mr-3'>
									Bestseller
								</span>
								<span className='rounded bg-yellow-600 p-0.5 text-xs mr-3'>
									{data.category}
								</span>
								<span className='rounded bg-blue-600 p-0.5 text-xs mr-3'>
									{data.stage}
								</span>
								<span className='p-0.5'>4.9 ⭐⭐⭐⭐⭐ (109 Rating)</span>
							</div>
							<div>
								<div className='flex gap-2'>
									Instructor:{' '}
									<span className='flex gap-5'>
										{data.instructor?.map((el, i) => (
											<span
												key={i}
												className='underline uppercase cursor-pointer'
											>
												{el}
											</span>
										))}
									</span>
								</div>
							</div>
						</div>

						<div>Duration: {data.duration} Months validity</div>
					</div>
				</div>
			</div>
		</div>
	);
}

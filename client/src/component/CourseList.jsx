/** @format */
import { useEffect, useState } from 'react';
import { Card } from './../home/MiniComponent.jsx';
import { useGetData, useGetCourses } from './../hooks/useGetData';
import PostSkeleton from './../material/PostSkeleton';
import Header from '../Header';
import { Link } from 'react-router-dom';

export default function CourseList() {
	const { courses, error, loading } = useGetCourses();

	return (
		<>
			<Header />
			<div className='mx-auto max-w-screen-xl px-4 py-12 lg:px-8'>
				<div className='mt-8 sm:mt-12 bg-gray-50 rounded-lg text-gray-700 md:p-10 p-1 m-auto'>
					<h1 className='text-gray-700 text-center text-3xl md:text-5xl font-bold underline mb-10 uppercase '>
						some of our popular courses
					</h1>

					<p className='text-purple-500 cursor-pointer'>
						<Link to={'/'}>Home</Link> / Courses{' '}
					</p>
					<div className='grid grid-cols-3 gap-10 justify-between my-20'>
						{error && <h1 className='text-center text-red-500'>{error}</h1>}
						{loading && (
							<>
								<PostSkeleton loading={loading} />
								<PostSkeleton loading={loading} />
								<PostSkeleton loading={loading} />
							</>
						)}
						{courses.length == 0 && !error && (
							<h1 className='text-center text-red-500'>No course available</h1>
						)}
						{courses.length !== 0 && (
							<>
								{courses.map((course) => (
									<Card
										data={course}
										key={course._id}
									/>
								))}
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

/** @format */

// import { useEffect, useState } from 'react';
// ha ha REACT Router ki copy hai mujhe is time pe react Router nhi aata tha
import { useTitle } from '../hooks/useTitle';
import AboutMe from '../Dashboard/AboutUser';
import { useGetUser } from '../hooks/useGetUser';
import NotFound from './NotFound.jsx';
import { useParams } from 'react-router-dom';
import Courses from './../Dashboard/Courses';
import { Link } from 'react-router-dom';
import Testimonial from './../Dashboard/Testimonials.jsx';
import UserTable from './../Dashboard/UserTable.jsx';
import CreateReview from '../Dashboard/CreateReview.jsx';
import CheckReview from '../Dashboard/CheckReview.jsx';

export default function Dashboard() {
	const { to } = useParams();
	const { user, error } = useGetUser();
	useTitle(`Dashboard`);

	return (
		<div>
			{error && <NotFound />}{' '}
			{user.name && (
				<>
					<Sidebar user={user} />
					<div className='sm:pl-64'>
						{to === 'courses' && <Courses />}
						{to === 'overview' && <AboutMe user={user} />}
						{to === 'testimonial' && <Testimonial />}
						{to === 'users' && <UserTable />}
						{to === 'createReview' && <CreateReview />}
						{to === 'checkReview' && <CheckReview />}
					</div>
				</>
			)}
		</div>
	);
}

const Sidebar = ({ user }) => {
	const isAdmin = user.role === 'admin';
	return (
		<>
			<button
				onClick={function () {
					const sidebar = document.getElementById('default-sidebar');
					sidebar.classList.toggle('-translate-x-full');
				}}
				data-drawer-target='default-sidebar'
				data-drawer-toggle='default-sidebar'
				aria-controls='default-sidebar'
				type='button'
				className='inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 absolute right-0'
			>
				<span className='sr-only'>Open sidebar</span>
				<svg
					className='w-6 h-6'
					aria-hidden='true'
					fill='currentColor'
					viewBox='0 0 20 20'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						clipRule='evenodd'
						fillRule='evenodd'
						d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
					></path>
				</svg>
			</button>

			<aside
				id='default-sidebar'
				className='fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0'
				aria-label='Sidebar'
			>
				<div className='h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800'>
					<ul className='space-y-2 font-medium'>
						<SidebarItem
							icon='dashboard'
							to='/dashboard/overview'
							text='Dashboard'
						/>
						<SidebarItem
							icon='kanban'
							text='My Courses'
						></SidebarItem>
						{!isAdmin && (
							<SidebarItem
								to='/dashboard/createReview'
								icon='inbox'
								text='Create Review'
							></SidebarItem>
						)}
						{isAdmin && (
							<>
								<SidebarItem
									icon='users'
									text='Users'
									to='/dashboard/users'
								/>
								<SidebarItem
									to='/dashboard/courses'
									icon='products'
									text='Course'
								></SidebarItem>
								<SidebarItem
									to='/dashboard/testimonial'
									icon='kanban'
									text='Testimonial'
								></SidebarItem>
								<SidebarItem
									to='/dashboard/checkReview'
									icon='inbox'
									text='Check Review'
								></SidebarItem>
							</>
						)}
						<SidebarItem
							icon='sign-in'
							text='Logout'
						/>
					</ul>
				</div>
			</aside>
		</>
	);
};

const SidebarItem = ({ icon, text, to, children }) => {
	return (
		<li>
			<Link
				to={to}
				className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
			>
				<svg
					className='w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
					aria-hidden='true'
					xmlns='http://www.w3.org/2000/svg'
					fill='currentColor'
					viewBox='0 0 22 21'
				>
					<path d={icons[icon]} />
				</svg>
				<span className='ms-3'>{text}</span>
				{children}
			</Link>
		</li>
	);
};

const icons = {
	'dashboard':
		'M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002ZM12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z',
	'kanban':
		'M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z',
	'inbox':
		'M17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 0 10 3a6.981 6.981 0 0 0 4.943-2H8.105L6.426.844A1.994 1.994 0 0 0 4.6 0h-3A1.994 1.994 0 0 0 0 1.844l.144 14.529A2.993 2.993 0 0 0 3 19h14a2.993 2.993 0 0 0 2.856-2.627L20 3.847a1.994 1.994 0 0 0-.582-1.224zm1.582 1.932L18.47 17.953a1 1 0 0 1-.96.848H3a1 1 0 0 1-1-1.006L1.886 1.844a1 1 0 0 1 .293-.73A.996.996 0 0 1 3.001 1h.011L5.194 3.84a2.976 2.976 0 0 0 2.047.823A6.983 6.983 0 0 0 10 5a6.982 6.982 0 0 0 5.053-2h.267a.998.998 0 0 1 .707.293A1 1 0 0 1 19 5.555Z',
	'users':
		'M15 12a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm-4 6a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.5a2.5 2.5 0 0 0-2-2.45V14a3 3 0 0 0-6 0v1.05a2.5 2.5 0 0 0-2 2.45v.5a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.5a2.5 2.5 0 0 0-2-2.45V14a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1.05a2.5 2.5 0 0 0-2 2.45ZM3.5 12a5.5 5.5 0 0 1 11 0Z',
	'products':
		'M19 6h-1V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v1H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2ZM5 6h14v10H5V6Zm14 12H5V11h14v7Z',
	'sign-in':
		'M19 10h-4V4.52a2.5 2.5 0 0 0-2.5-2.52h-3A2.5 2.5 0 0 0 7 4.52V10H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1Zm-7 5a1 1 0 1 1 1-1A1 1 0 0 1 12 15Zm2-8V4.52A.5.5 0 0 1 14.5 4h3a.5.5 0 0 1 .5.52V7h-4Z',
	'sign-up':
		'M19 8h-4V2.52a2.5 2.5 0 0 0-2.5-2.52h-3A2.5 2.5 0 0 0 7 2.52V8H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1Zm-7 5a1 1 0 1 1 1-1A1 1 0 0 1 12 13Zm2-8V2.52A.5.5 0 0 1 14.5 2h3a.5.5 0 0 1 .5.52V5h-4Z',
};

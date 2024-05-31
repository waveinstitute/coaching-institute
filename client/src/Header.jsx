/** @format */
import { Link } from 'react-router-dom';

import { Fragment, useState } from 'react';
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react';
import {
	ArrowPathIcon,
	Bars3Icon,
	ChartPieIcon,
	CursorArrowRaysIcon,
	SquaresPlusIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline';
import {
	ChevronDownIcon,
	PhoneIcon,
	PlayCircleIcon,
} from '@heroicons/react/20/solid';
import SignInform from './Signup';
import SnackBar from './material/SnackBar.jsx';
import Menu from './material/Menu.jsx';
import { useGetUser } from './hooks/useGetUser.js';
import Cookies from 'js-cookie';

const products = [
	{
		name: 'Board Exam Preparation',
		description:
			'Comprehensive courses designed to help you excel in your board exams.',
		href: '#',
		icon: ArrowPathIcon, // replace with the appropriate icon component
	},
	{
		name: 'JEE Mains Coaching',
		description: 'Expert guidance and practice to ace your JEE Mains.',
		href: '#',
		icon: ChartPieIcon, // replace with the appropriate icon component
	},
	{
		name: 'Personalized Mentorship',
		description: 'One-on-one mentorship to address your unique academic needs.',
		href: '#',
		icon: CursorArrowRaysIcon, // replace with the appropriate icon component
	},
	{
		name: 'Mock Tests & Assessments',
		description:
			'Regular mock tests to track progress and identify areas for improvement.',
		href: '#',
		icon: SquaresPlusIcon, // replace with the appropriate icon component
	},
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [snackbar, setSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [snackbarType, setSnackbarType] = useState('success');
	const { user, setUser } = useGetUser();

	const closeSnackBar = function () {
		setTimeout(() => {
			setSnackbar(false);
			setSnackbarMessage('');
			setSnackbarType('success');
		}, 5000);
	};

	const openSnackBar = (message, alertType = 'success') => {
		setSnackbar(true);
		setSnackbarMessage(message);
		setSnackbarType(alertType);
		closeSnackBar();
	};

	function setSignedOut() {
		setUser({});
		Cookies.remove('jwt-token');
		openSnackBar('You have signed out', 'success');
	}
	const callsToAction = [
		{
			name: 'View Courses',
			to: '/course',
			icon: PlayCircleIcon, // replace with the appropriate icon component
		},
		{
			name: 'Contact Us',
			to: '/contact',
			icon: PhoneIcon, // replace with the appropriate icon component
		},
	];

	return (
		<>
			{snackbar && <SnackBar type={snackbarType}>{snackbarMessage}</SnackBar>}
			<header className='bg-white'>
				<nav
					className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8'
					aria-label='Global'
				>
					<div className='flex lg:flex-1'>
						<a
							href='#'
							className='-m-1.5 p-1.5'
						>
							<span className='sr-only'>Wave</span>
							<img
								className='h-8 w-auto'
								src='/logo.png'
								alt=''
							/>
						</a>
					</div>
					<div className='flex lg:hidden'>
						<button
							type='button'
							className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
							onClick={() => setMobileMenuOpen(true)}
						>
							<span className='sr-only'>Open main menu</span>
							<Bars3Icon
								className='h-6 w-6'
								aria-hidden='true'
							/>
						</button>
					</div>
					<Popover.Group className='hidden lg:flex lg:gap-x-12'>
						<Popover className='relative'>
							<Popover.Button className='flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900'>
								Features
								<ChevronDownIcon
									className='h-5 w-5 flex-none text-gray-400'
									aria-hidden='true'
								/>
							</Popover.Button>

							<Transition
								as={Fragment}
								enter='transition ease-out duration-200'
								enterFrom='opacity-0 translate-y-1'
								enterTo='opacity-100 translate-y-0'
								leave='transition ease-in duration-150'
								leaveFrom='opacity-100 translate-y-0'
								leaveTo='opacity-0 translate-y-1'
							>
								<Popover.Panel className='absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5'>
									<div className='p-4'>
										{products.map((item) => (
											<div
												key={item.name}
												className='group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50'
											>
												<div className='flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white'>
													<item.icon
														className='h-5 w-5 flex-none text-gray-400'
														aria-hidden='true'
													/>
												</div>
												<div className='flex-auto'>
													<a
														href={item.href}
														className='block font-semibold text-gray-900'
													>
														{item.name}
														<span className='absolute inset-0' />
													</a>
													<p className='mt-1 text-gray-600'>
														{item.description}
													</p>
												</div>
											</div>
										))}
									</div>
									<div className='grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50'>
										{callsToAction.map((item) => (
											<Link
												key={item.name}
												to={item.to}
												className='flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100'
											>
												<item.icon
													className='h-5 w-5 flex-none text-gray-400'
													aria-hidden='true'
												/>
												{item.name}
											</Link>
										))}
									</div>
								</Popover.Panel>
							</Transition>
						</Popover>

						<Link
							to='/contact'
							className='text-sm font-semibold leading-6 text-gray-900'
						>
							Contact us
						</Link>
						<Link
							to='/about'
							className='text-sm font-semibold leading-6 text-gray-900'
						>
							About us
						</Link>
						<Link
							to='/course'
							className='text-sm font-semibold leading-6 text-gray-900'
						>
							Courses
						</Link>
					</Popover.Group>
					<div className='hidden lg:flex lg:flex-1 lg:justify-end'>
						{user.name ? (
							<div>
								<Menu
									userSrc={`${user?.photo}`}
									onLogout={setSignedOut}
								/>
							</div>
						) : (
							<div>
								<SignInform
									onSetSnackbar={openSnackBar}
									onSetUser={setUser}
								/>
							</div>
						)}
					</div>
				</nav>
				<Dialog
					as='div'
					className='lg:hidden'
					open={mobileMenuOpen}
					onClose={setMobileMenuOpen}
				>
					<div className='fixed inset-0 z-10' />
					<Dialog.Panel className='fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
						<div className='flex items-center justify-between'>
							<Link
								to='/'
								className='-m-1.5 p-1.5'
							>
								<span className='sr-only'>wave</span>
								<img
									className='h-8 w-auto'
									src='/logo.png'
									alt=''
								/>
							</Link>
							<button
								type='button'
								className='-m-2.5 rounded-md p-2.5 text-gray-700'
								onClick={() => setMobileMenuOpen(false)}
							>
								<span className='sr-only'>Close menu</span>
								<XMarkIcon
									className='h-6 w-6'
									aria-hidden='true'
								/>
							</button>
						</div>
						<div className='mt-6 flow-root'>
							<div className='-my-6 divide-y divide-gray-500/10'>
								<div className='space-y-2 py-6'>
									<Disclosure
										as='div'
										className='-mx-3'
									>
										{({ open }) => (
											<>
												<Disclosure.Button className='flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'>
													Product
													<ChevronDownIcon
														className={classNames(
															open ? 'rotate-180' : '',
															'h-5 w-5 flex-none'
														)}
														aria-hidden='true'
													/>
												</Disclosure.Button>
												<Disclosure.Panel className='mt-2 space-y-2'>
													{[...products, ...callsToAction].map((item) => (
														<Disclosure.Button
															key={item.name}
															as='a'
															href={item.to}
															className='block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50'
														>
															{item.name}
														</Disclosure.Button>
													))}
												</Disclosure.Panel>
											</>
										)}
									</Disclosure>
									<div className='flex flex-col gap-5'>
										<Link
											to='/contact'
											className='text-sm font-semibold leading-6 text-gray-900'
										>
											Contact us
										</Link>
										<Link
											to='/about'
											className='text-sm font-semibold leading-6 text-gray-900'
										>
											About us
										</Link>
										<Link
											to='/course'
											className='text-sm font-semibold leading-6 text-gray-900'
										>
											Courses
										</Link>
									</div>
								</div>
								<div className='py-6'>
									{user.name ? (
										<div>
											<Menu
												userSrc={`${user?.photo}`}
												onLogout={setSignedOut}
											/>
										</div>
									) : (
										<div>
											<SignInform
												onSetSnackbar={openSnackBar}
												onSetUser={setUser}
											/>
										</div>
									)}
								</div>
							</div>
						</div>
					</Dialog.Panel>
				</Dialog>
			</header>
		</>
	);
}

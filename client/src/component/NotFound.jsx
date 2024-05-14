/** @format */

export default function NotFound({ status = 404, message = 'Not Found' }) {
	return (
		<div className='grid h-screen place-content-center bg-white px-4'>
			<h1 className='uppercase tracking-widest text-gray-500'>
				{status} | {message}
			</h1>
		</div>
	);
}

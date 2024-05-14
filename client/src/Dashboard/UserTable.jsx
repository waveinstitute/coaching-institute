/** @format */

import { DataGrid } from '@mui/x-data-grid';
import { useGetAllUser } from '../hooks/useGetAllUser';
import Modal from './../material/Modal.jsx';

const columns = [
	{ field: 'id', headerName: 'ID', width: 90 },
	{ field: 'name', headerName: 'Name', width: 70 },
	{ field: 'email', headerName: 'Email', width: 130 },
	{ field: 'subscriber', headerName: 'Subscriber', width: 130 },
	{ field: 'courses', headerName: 'Courses', width: 130 },
	{ field: 'phone', headerName: 'Phone', width: 130 },
	{
		field: 'action',
		headerName: 'Action',
		width: 130,
		renderCell: (data) => {
			return (
				<Modal text='details'>
					<UserDetails data={data.row} />
				</Modal>
			);
		},
	},
];

// const rows = [
// 	{
// 		id: 1,
// 		name: 'adarsh',
// 		email: 'adarsh@admin.io',
// 		subscriber: true,
// 		courses: 'test',
// 		phone: '1234567890',
// 	},
// 	{
// 		id: 2,
// 		name: 'shantanu',
// 		email: 'shantanu@admin.io',
// 		subscriber: false,
// 		courses: 'adarsh',
// 		phone: '1234567890',
// 	},
// ];

export default function DataTable() {
	const [users, error, loading] = useGetAllUser();
	const userRows = users.map((user) => {
		return {
			id: user._id,
			name: user.name,
			email: user.email,
			subscriber: user.courseEnrolled.length > 0,
			courses: user.courseEnrolled.map((course) => course.title).join(', '),
			phone: user.phone,
		};
	});

	return (
		<div className='w-[80%] mx-auto my-32'>
			{loading && (
				<h1 className='font-bold text-gray-600 text-xl'>Loading...</h1>
			)}
			{users.length === 0 && !error && !loading && (
				<h1 className='font-bold text-gray-600 text-xl'>No users Found</h1>
			)}
			{users.length > 0 && (
				<div style={{ width: '100%' }}>
					<DataGrid
						rows={userRows}
						columns={columns}
						initialState={{
							pagination: {
								paginationModel: { page: 0, pageSize: 5 },
							},
						}}
						pageSizeOptions={[5, 10]}
						checkboxSelection
					/>
				</div>
			)}
		</div>
	);
}

function UserDetails({ data }) {
	return (
		<div>
			<div className='flex flex-col items-center gap-10'>
				<h1 className='capitalize font-bold'>Name: {data.name}</h1>
				<h1 className=''>Email: {data.email}</h1>
				<h1 className=''>Phone: {data.phone}</h1>
				<h1>ID: {data.id}</h1>
				<h1 className=''>Subscriber: {data.subscriber ? 'Yes' : 'No'}</h1>
				{data.subscriber && <h1 className=''>Courses: {data.courses}</h1>}
			</div>
		</div>
	);
}

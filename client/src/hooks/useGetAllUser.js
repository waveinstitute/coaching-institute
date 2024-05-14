/** @format */

import { useState, useEffect } from 'react';
import { handleGetReq } from '../apiFeatures';

export const useGetAllUser = () => {
	const [users, setUsers] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const res = await handleGetReq('/api/v1/users');
			setLoading(false);
			if (res.status !== 'success') {
				setError(res.error);
				return;
			}
			setUsers(res.data.data);
		};
		fetchData();
	}, []);

	return [users, error, loading];
};

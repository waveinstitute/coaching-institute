/** @format */

import { useEffect, useState } from 'react';
import { getUser } from '../apiFeatures';
import Cookies from 'js-cookie';

export function useGetUser(token = Cookies.get('jwt-token')) {
	const [user, setUser] = useState({});
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!token) {
			setError('No token found');
			return;
		}
		const fetchData = async function () {
			const user = await getUser(token);
			if (user.status !== 'success') setError(res.message);
			setUser(user.data.data);
		};
		fetchData();
	}, []);
	return { user, setUser, error };
}

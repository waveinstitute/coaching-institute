/** @format */

import { useEffect, useState } from 'react';
import { getUser } from '../apiFeatures';

export function useGetUser() {
	const [user, setUser] = useState({});
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async function () {
			const user = await getUser();
			if (user.status !== 'success') setError(user.message);
			setUser(user.data.data);
		};
		fetchData();
	}, []);
	return { user, setUser, error };
}

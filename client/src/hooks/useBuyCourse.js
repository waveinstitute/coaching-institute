/** @format */

import { useEffect } from 'react';
import { useGetUser } from './useGetUser';

export async function useBuyCourse() {
	const { user, error } = useGetUser();

	useEffect(() => {
		if (error) {
			console.log(error);
		}
		if (!user) {
			console.log('No user found');
		}
		if (!error && user) {
			console.log('you are ok to buy course');
		}
	}, [user, error]);
}

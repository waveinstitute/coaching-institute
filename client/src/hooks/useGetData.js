/** @format */

import { useEffect, useState } from 'react';
import { getAny } from '../apiFeatures';

export function useGetData(route, id) {
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);

	function onChangeData(changeData) {
		const remaining = data.filter((course) => course._id !== changeData._id);
		setData([changeData, ...remaining]);
	}
	function onAddData(newData) {
		setData([...data, newData]);
	}

	function onDeleteData(id) {
		const remaining = data.filter((course) => course._id !== id);
		setData(remaining);
	}

	useEffect(() => {
		const fetchData = async function () {
			const res = await getAny(route, id);
			if (res.status === 'success') setData(res.data.data);
			else setError(res.message);
		};
		fetchData();
	}, [id, route]);
	return { data, error, onChangeData, onAddData, onDeleteData };
}

export function useGetCourses() {
	const [courses, setCourse] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async function () {
			const res = await getAny('/api/v1/course');
			setLoading(false);
			if (res.status === 'success')
				setCourse(
					res.data.data.filter((course) => course.stage === 'Published')
				);
			else setError(res.message || 'failed to fetch course');
		};
		fetchData();
	}, []);
	return { courses, error, loading };
}

/** @format */
import { useState, useEffect } from 'react';

export function useTitle(init) {
	const [title, setTitle] = useState(`WAVE | ${init}`);

	useEffect(() => {
		document.title = title;
	}, [title]);

	return setTitle;
}

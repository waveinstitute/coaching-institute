/** @format */

import React, { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function CourseDate(setDate) {
	const [selectedDate, setSelectedDate] = useState(null);

	const handleDateChange = (date) => {
		setDate(date.$d.toISOString());
		setSelectedDate(date);
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<DemoContainer components={['DatePicker']}>
				<DatePicker
					label='MM/DD/YYYY'
					value={selectedDate}
					onChange={handleDateChange}
				/>
			</DemoContainer>
		</LocalizationProvider>
	);
}

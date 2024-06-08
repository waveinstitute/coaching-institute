/** @format */

// this is api features page
import axios from 'axios';
import Cookies from 'js-cookie';

// const base = process.env.REACT_APP_BACKEND_API	;
const base = import.meta.env.VITE_BACKEND_API;

const setHeader = function () {
	const token = Cookies.get('jwt-token');
	return {
		'Authorization': `Bearer ${token}`,
		'Content-Security-Policy': "default-src 'self'",
		'X-Content-Type-Options': 'nosniff',
		'X-Frame-Options': 'DENY',
		'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
	};
};

export const handleGetReq = async function (suffixRoute) {
	const route = base + suffixRoute;
	try {
		const res = await axios.get(route, {
			headers: setHeader(),
		});
		if (res.status === 200) return res.data;
		else {
			return {
				status: 400,
				message: `failed to get the data to ${route} route`,
			};
		}
	} catch (err) {
		if (err.response.status === 500)
			return { status: 500, message: 'Server Is Down, Please try Later' };
		return err.response.data;
	}
};

export const handlePostReq = async function (suffixRoute, data) {
	const route = base + suffixRoute;
	try {
		const res = await axios.post(route, data, { headers: setHeader() });
		if (res.status === 200 || res.status === 201) return res.data;
		else
			return {
				status: 400,
				message: `failed to post the data to ${route} route`,
			};
	} catch (err) {
		console.log(err.response.data);
		return err.response.data;
	}
};

export const handlePatchReq = async function (suffixRoute, data) {
	const route = base + suffixRoute;
	try {
		const res = await axios.patch(route, data, { headers: setHeader() });
		if (res.status === 200) return res.data;
		else {
			console.log({ res });
			return {
				status: 400,
				message: `failed to patch the data to ${route} route`,
			};
		}
	} catch (err) {
		return err.response.data;
	}
};

export const handleDeleteReq = async function (suffixRoute) {
	const route = base + suffixRoute;
	try {
		const res = await axios.delete(route, { headers: setHeader() });
		if (res.status === 204) return { status: 'success' };
		else
			return {
				status: 400,
				message: `failed to delete the data to ${route} route`,
			};
	} catch (err) {
		return err.response.data;
	}
};

export const handleImageUpload = async function (file) {
	const formData = new FormData();
	formData.append('file', file);
	try {
		const route = base + '/api/v1/upload';
		const res = await axios.post(route, formData, {
			headers: setHeader(),
		});
		if (res.status === 200)
			return { status: 'success', data: res.data.data.res };
		else
			return {
				status: 400,
				message: `failed to upload the image`,
			};
	} catch (err) {
		return err.response.data;
	}
};

// auth based Routes
export const login = async function (email, password) {
	const route = '/api/v1/users/login';
	const data = { email, password };
	return await handlePostReq(route, data);
};

export const signup = async function (data) {
	const route = '/api/v1/users/signup';
	const filteredData = {
		name: data.name,
		email: data.email,
		password: data.password,
		passwordConfirm: data.passwordConfirm,
		phone: data.phone,
	};
	return await handlePostReq(route, filteredData);
};

// GET REQ
export const getUser = async function () {
	const route = '/api/v1/users/me';
	return await handleGetReq(route);
};
// Course Route
export const getCourse = async function () {
	const route = '/api/v1/course';
	return await handleGetReq(route);
};

export const postCourse = async function (data) {
	const route = `/api/v1/course/`;
	return await handlePostReq(route, data);
};

export const updateCourse = async function (data) {
	const route = `/api/v1/course/${data._id}`;
	return await handlePatchReq(route, data);
};

export const deleteCourse = async function (data) {
	const route = `/api/v1/course/${data._id}`;
	return await handleDeleteReq(route);
};

export const getAny = async function (route, id = '') {
	if (id) {
		const fullRoute = `${route}/${id}`;
		return await handleGetReq(fullRoute);
	} else {
		return await handleGetReq(route);
	}
};

// testimonials
export const getTestimonial = async () =>
	await handleGetReq('/api/v1/testimonial');

export const deleteTestimonial = async (id) =>
	await handleDeleteReq(`/api/v1/testimonial/${id}`);

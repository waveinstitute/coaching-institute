/** @format */

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');
const courseRouter = require('./routes/courseRoute');
const testimonialRouter = require('./routes/testimonialRoute');
const imageRouter = require('./routes/imageRoute');
const emailRouter = require('./routes/emailRoute');

const cors = require('cors');

const app = express();

// 1) MIDDLEWARES
// a) security header settting
app.use(
	helmet({
		contentSecurityPolicy: {
			directives: {
				defaultSrc: ["'self'", 'data:', 'blob:', 'https:', 'ws:'],
				baseUri: ["'self'"],
				fontSrc: ["'self'", 'https:', 'data:'],
				scriptSrc: [
					"'self'",
					'https:',
					'http:',
					'blob:',
					'https://*.mapbox.com',
					'https://js.stripe.com',
					'https://m.stripe.network',
					'https://*.cloudflare.com',
				],
				frameSrc: ["'self'", 'https://js.stripe.com'],
				objectSrc: ["'none'"],
				styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
				workerSrc: [
					"'self'",
					'data:',
					'blob:',
					'https://*.tiles.mapbox.com',
					'https://api.mapbox.com',
					'https://events.mapbox.com',
					'https://m.stripe.network',
				],
				childSrc: ["'self'", 'blob:'],
				imgSrc: ["'self'", 'data:', 'blob:'],
				formAction: ["'self'"],
				connectSrc: [
					"'self'",
					"'unsafe-inline'",
					'data:',
					'blob:',
					'https://*.stripe.com',
					'https://*.mapbox.com',
					'https://*.cloudflare.com/',
					'https://bundle.js:*',
					'ws://127.0.0.1:*/',
				],
				upgradeInsecureRequests: [],
			},
		},
	})
);
app.use(cors());

// genral information of the type of requests which is comming
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// limmiting the number of request comming from a certain ip address
const limiter = rateLimit({
	max: 100,
	windowMs: 60 * 1000, // for 1 hour user can send only 100 requests
	message: 'to many request from this ip please try after a minute',
});

app.use('/api', limiter);

// for gettting the query sting in formatted form
app.use(express.json({ limit: '5kb' }));
app.use(cookieParser());

// data sanitization against nosql query injection
app.use(mongoSanitize());

// data sanitization against XSS
app.use(xss());

// prevent parament pollution
app.use(
	hpp({
		whitelist: [
			'durration',
			'difficulty',
			'maxGroupSize',
			'price',
			'ratingQuantity',
		],
	})
);

app.get('/', (req, res, next) => {
	res.status(200).send('this is working fine');
});

app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	next();
});

// 3) ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/post', postRouter);
app.use('/api/v1/course', courseRouter);
app.use('/api/v1/testimonial', testimonialRouter);
app.use('/api/v1/upload', imageRouter);
app.use('/api/v1/email', emailRouter);

app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
module.exports = app;

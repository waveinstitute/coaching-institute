/** @format */
const nodemailer = require('nodemailer');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const dotenv = require('dotenv');
dotenv.config({ path: './../config.env' });

const transporter = nodemailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	port: 587,
	secure: false, // Use `true` for port 465, `false` for all other ports
	auth: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_PASSWORD,
	},
});

const promotionalMail = ({ username, content }) => {
	return `
	<div class="container">
    <!-- Header -->
    <div class="header">
        <h1>Hello from WAVE COACHING INSTITUTE</h1>
    </div>
    <!-- Content -->
    <div class="content">
        <p class="bold">Hello ${username}, .</p>
        ${content}
    </div>
    <!-- Footer -->
    <div class="footer">
        <p>&copy; WAVE. All rights reserved.</p>
    </div>
</div>

`;
};

const signUpMailContent = `
	<h3>You are successfully signup</h3>
	<img width="400px" src="https://nova-live.imgix.net//What%20is%20Coaching-0c6b0d91-054a-46e8-af5f-0f723e1a67b6.png?" alt="">
	<p>Thanks for signing up with us</p>
	<p>explore different ways to use application :)</p>
`;

const courseTakenContent = (image) => `
	<h3>You are successfully enrolled to our course</h3>
	<img src="${image}" alt="">
	<p>Thanks for enrolling in our course</p>
	<p>explore different ways to use application :)</p>
`;

const customMail = function(content) {
	return `<h3>Here is a message from the WAVE COACHING</h3><p>${content}</p><p>explore different ways to use application :)</p>`;
};

async function main(to, username, content) {
	const info = transporter.sendMail(
		{
			from: '"Adarsh singh" <waveinstitute025@gmial.com>', // sender address
			to, // list of receivers
			subject: 'Whats up, check this out', // Subject line
			text: content,
			html: promotionalMail({ username, content }),
		},
		(err) => {
			if (err) console.log(`error occoured ${err}`);
			else return { status: 'success', message: 'email sent' };
		}
	);
}

const mailController = async function(type, to, username, content, src) {
	if (type === 'signup') return await main(to, username, signUpMailContent);
	if (type === 'enroll')
		return await main(to, username, () => courseTakenContent(src));
	if (type === 'custom') return await main(to, username, customMail(content));
};

exports.signUpMail = catchAsync(async (req, res, next) => {
	// mailController('signup', 'officialadarsh2021@gmail.com', 'adarsh singha');
	await mailController('signup', req.body.email, req.body.username);
	res.status(200).json({
		status: 'success',
		message: 'email sent',
	});
});

exports.sendEnquiryMail = function(req, res, next) {
	mailController(
		'custom',
		'waveinstitute025@gmail.com',
		'adarsh',
		JSON.stringify(req.body)
	);
	res.status(200).json({ status: 'success', message: 'email send' });
};

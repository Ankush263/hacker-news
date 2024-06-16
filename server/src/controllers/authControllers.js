const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const UserRepo = require('../repo/user-repo');

dotenv.config();

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

const createAndSendToken = (user, statusCode, res) => {
	const token = signToken(user[0].id);

	const cookieOptions = {
		expires: new Date(
			Date.now() +
				parseInt(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
	};

	if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

	res.cookie('jwt', token, cookieOptions);

	user.password = undefined;

	res.status(statusCode).json({
		status: 'success',
		token,
		data: {
			user,
		},
	});
};

exports.signup = catchAsync(async (req, res, next) => {
	const { username, email, password } = req.body;

	const validEmail = validator.isEmail(email);

	if (!validEmail) {
		return next(new AppError('Please provied a valid Email', 404));
	}

	const existUser = await UserRepo.findByEmail(email);

	if (existUser.length > 0) {
		return next(new AppError('User with this email is already exists', 404));
	}

	if (!email || !password) {
		return next(new AppError('Please provide email and password', 404));
	}

	const hashedPasswoed = bcrypt.hashSync(password, 12);

	const newUser = await UserRepo.create(username, email, hashedPasswoed);

	createAndSendToken([newUser], 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new AppError(`Please provide email and password`, 404));
	}

	const user = await UserRepo.findByEmail(email);

	if (!user[0] || !bcrypt.compareSync(password, user[0].password)) {
		return next(new AppError(`Incorrect email or password`, 401));
	}

	createAndSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	} else if (req.cookies.jwt) {
		token = req.cookies.jwt;
	}

	if (!token || token === 'undefined') {
		return next(
			new AppError(`You aren't logged in! Please log in to get access`, 401)
		);
	}

	const decoded = jwt.decode(token);

	const freshUser = await UserRepo.findById(decoded.id);

	if (!freshUser) {
		return next(
			new AppError(`The user belonging to this token does no longer exist`, 401)
		);
	}

	req.user = freshUser;

	next();
});

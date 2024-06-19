const AppError = require('../utils/appError');

const handleNullError = (err) => {
	const message = `Null Error: ${err.column} can't be null`;
	return new AppError(message, 401);
};

const handleConnectionError = (err) => {
	const message = `Connection failure`;
	return new AppError(message, 401);
};

const handleSQLConnectionError = (err) => {
	const message = `SQL Connection failure`;
	return new AppError(message, 401);
};

const handleInvalidInput = (err) => {
	const message = `Invalid Inputs`;
	return new AppError(message, 401);
};

const sendErrorDev = (err, res) => {
	res.status(err.statusCode).json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack,
	});
};

const sendErrorProd = (err, res) => {
	if (err.isOperational) {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});
	} else {
		res.status(500).json({
			status: 'error',
			message: 'Something went very wrong!',
		});
	}
};

module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';

	res.set('Access-Control-Allow-Origin', '*');

	if (process.env.NODE_ENV === 'development') {
		sendErrorDev(err, res);
	} else if (process.env.NODE_ENV === 'production') {
		let error = err;

		if (error.code === '23502') error = handleNullError(error);
		if (
			error.code === '08000' ||
			error.code === '08003' ||
			error.code === '08006'
		)
			error = handleConnectionError(error);
		if (error.code === '08001' || error.code === '08004')
			error = handleSQLConnectionError(error);
		if (error.code === '22P02') error = handleInvalidInput(err);

		sendErrorProd(error, res);
	}
};

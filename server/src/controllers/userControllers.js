const UserRepo = require('../repo/user-repo');
const catchAsync = require('../utils/catchAsync');

exports.getMe = catchAsync(async (req, res, next) => {
	const user = await UserRepo.findById(req.user.id);

	res.status(200).json({
		status: 'success',
		data: user,
	});
});

exports.updateMe = catchAsync(async (req, res, next) => {
	const { username, email, about } = req.body;

	const user = await UserRepo.findByIdAndUpdate(
		req.user.id,
		username,
		email,
		about
	);

	res.status(200).json({
		status: 'success',
		data: user,
	});
});

exports.deleteMe = catchAsync(async (req, res, next) => {
	const user = await UserRepo.findByIdAndDelete(req.user.id);

	res.status(204).json({
		status: 'success',
		data: user,
	});
});

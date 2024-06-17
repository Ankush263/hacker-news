const ItemRepo = require('../repo/item-repo');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const UserRepo = require('../repo/user-repo');
const pool = require('../pool');

exports.createItem = catchAsync(async (req, res, next) => {
	const { type, title, text, url, poll, parent } = req.body;

	const user = await UserRepo.findById(req.user.id);
	if (!user) {
		return next(new AppError('User with that id does not exists', 404));
	}

	const username = user.username;

	const item = await ItemRepo.create(
		req.user.id,
		username,
		type,
		title,
		text,
		url,
		poll,
		parent
	);

	if (parent) {
		const parentItem = await ItemRepo.findById(parent);

		if (
			type === 'comment' &&
			(parentItem.type === 'post' ||
				parentItem.type === 'story' ||
				parentItem.type === 'comment' ||
				parentItem.type === 'poll')
		) {
			await pool.query(
				`
						UPDATE items
						SET
							kids = array_append(kids, $1)
						WHERE id = $2
						RETURNING *
					`,
				[item.id, parent]
			);
		}

		await ItemRepo.increaseDescendants(parent);
	}

	res.status(201).json({
		status: 'success',
		data: item,
	});
});

exports.findItemById = catchAsync(async (req, res, next) => {
	const item = await ItemRepo.findById(req.params.id);

	if (!item) {
		return next(new AppError('Item with that id does not exists', 404));
	}

	res.status(200).json({
		status: 'success',
		data: item,
	});
});

exports.deleteItem = catchAsync(async (req, res, next) => {
	const item = await ItemRepo.findById(req.params.id);

	if (item.userId.toString() !== req.user.id.toString()) {
		return next(new AppError('You are not the owner of this item', 404));
	}

	await ItemRepo.findByIdAndDelete(req.params.id);

	res.status(200).json({
		status: 'success',
		data: null,
	});
});

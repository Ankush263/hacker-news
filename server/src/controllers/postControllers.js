const PostRepo = require('../repo/post-repo');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const UserRepo = require('../repo/user-repo');
const CommentRepo = require('../repo/comment-repo');

exports.createPost = catchAsync(async (req, res, next) => {
	const { title, text, url } = req.body;

	const user = await UserRepo.findById(req.user.id);
	if (!user) {
		return next(new AppError('User with that id does not exists', 404));
	}

	const username = user.username;

	let type = 'post';

	if (title.startsWith('Ask HN:')) {
		type = 'ask';
	} else if (title.startsWith('Show HN:')) {
		type = 'show';
	}

	const post = await PostRepo.create(
		req.user.id,
		username,
		type,
		title,
		text,
		url
	);

	res.status(201).json({
		status: 'success',
		data: post,
	});
});

exports.findAllPostsDec = catchAsync(async (req, res, next) => {
	const posts = await PostRepo.findAllPostDesc();

	res.status(200).json({
		status: 'success',
		data: posts,
	});
});

exports.findAllNewPosts = catchAsync(async (req, res, next) => {
	const posts = await PostRepo.findAllNewPosts();

	res.status(200).json({
		status: 'success',
		data: posts,
	});
});

exports.findAllTypePosts = catchAsync(async (req, res, next) => {
	const { type } = req.params;
	const posts = await PostRepo.findTypePosts(type);

	res.status(200).json({
		status: 'success',
		data: posts,
	});
});

exports.findPostById = catchAsync(async (req, res, next) => {
	const post = await PostRepo.findById(req.params.id);

	if (!post) {
		return next(new AppError('Post with that id does not exists', 404));
	}

	res.status(200).json({
		status: 'success',
		data: post,
	});
});

exports.updatePost = catchAsync(async (req, res, next) => {
	const { title, text, url } = req.body;

	const post = await PostRepo.findById(req.params.id);

	if (post.userId.toString() !== req.user.id.toString()) {
		return next(new AppError('You are not the owner of this post', 404));
	}

	const user = await PostRepo.findByIdAndUpdate(
		req.params.id,
		title,
		text,
		url
	);

	res.status(200).json({
		status: 'success',
		data: user,
	});
});

exports.deletePost = catchAsync(async (req, res, next) => {
	const post = await PostRepo.findById(req.params.id);

	if (post.userId.toString() !== req.user.id.toString()) {
		return next(new AppError('You are not the owner of this post', 404));
	}

	const allComments = await CommentRepo.findByPostId(post.id);

	await Promise.all(
		allComments.map(async (comment) => {
			await CommentRepo.findByIdAndDelete(comment.id);
		})
	);

	await PostRepo.findByIdAndDelete(req.params.id);

	res.status(200).json({
		status: 'success',
		data: null,
	});
});

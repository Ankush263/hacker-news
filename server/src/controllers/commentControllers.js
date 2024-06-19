const CommentRepo = require('../repo/comment-repo');
const PostRepo = require('../repo/post-repo');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const UserRepo = require('../repo/user-repo');

exports.createComment = catchAsync(async (req, res, next) => {
	const { content, postId, parentId } = req.body;

	if (!postId) {
		return next(new AppError(`A comment must associate with a post`, 404));
	}

	const user = await UserRepo.findById(req.user.id);
	if (!user) {
		return next(new AppError('User with that id does not exists', 404));
	}

	const username = user.username;

	const comment = await CommentRepo.create(
		req.user.id,
		username,
		content,
		postId,
		parentId
	);

	await PostRepo.increaseDescendants(postId);

	res.status(200).json({
		status: 'success',
		data: comment,
	});
});

exports.getCommentsByPostId = catchAsync(async (req, res, next) => {
	const comments = await CommentRepo.findByPostId(req.params.postId);

	res.status(200).json({
		status: 'success',
		data: comments,
	});
});

exports.updateComment = catchAsync(async (req, res, next) => {
	const { content } = req.body;

	const comment = await CommentRepo.findById(req.params.id);

	if (!comment) {
		return next(new AppError('Comment with that id does not exists', 404));
	}

	if (comment.userId !== req.user.id) {
		return next(new AppError('You are not the owner of this comment', 404));
	}

	const updatedComment = await CommentRepo.findByIdAndUpdate(
		req.params.id,
		content
	);

	res.status(200).json({
		status: 'success',
		data: updatedComment,
	});
});

exports.deleteComment = catchAsync(async (req, res, next) => {
	const comment = await CommentRepo.findById(req.params.id);

	if (!comment) {
		return next(new AppError('Comment with that id does not exists', 404));
	}

	if (comment.userId !== req.user.id) {
		return next(new AppError('You are not the owner of this comment', 404));
	}

	const postId = comment.postId;

	await CommentRepo.findByIdAndDelete(req.params.id);
	await PostRepo.decreaseDescendants(postId);

	res.status(200).json({
		status: 'success',
		data: null,
	});
});

exports.upvoteToComment = catchAsync(async (req, res, next) => {
	const post = await CommentRepo.upvote(req.params.id);

	if (!post) {
		return next(new AppError('Post with that id does not exists', 404));
	}

	res.status(201).json({
		status: 'success',
		data: post,
	});
});

exports.downvoteToComment = catchAsync(async (req, res, next) => {
	const post = await CommentRepo.downvote(req.params.id);

	if (!post) {
		return next(new AppError('Post with that id does not exists', 404));
	}

	res.status(201).json({
		status: 'success',
		data: post,
	});
});

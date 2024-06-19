const {
	createComment,
	getCommentsByPostId,
	updateComment,
	deleteComment,
	upvoteToComment,
	downvoteToComment,
} = require('../controllers/commentControllers');
const { Router } = require('express');
const { protect } = require('../controllers/authControllers');

const router = Router();

router.route('/post/:postId').get(getCommentsByPostId);

router.route('/upvote/:id').patch(upvoteToComment);
router.route('/downvote/:id').patch(downvoteToComment);

router.route('/').post(protect, createComment);
router
	.route('/:id')
	.patch(protect, updateComment)
	.delete(protect, deleteComment);

module.exports = router;

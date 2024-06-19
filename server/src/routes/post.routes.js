const { Router } = require('express');
const { protect } = require('../controllers/authControllers');
const {
	createPost,
	findPostById,
	deletePost,
	findAllPostsDec,
	updatePost,
	findAllNewPosts,
	findAllTypePosts,
} = require('../controllers/postControllers');

const router = Router();

router.route('/new').get(findAllNewPosts);

router.route('/type/:type').get(findAllTypePosts);

router.route('/').post(protect, createPost).get(findAllPostsDec);
router
	.route('/:id')
	.get(findPostById)
	.delete(protect, deletePost)
	.patch(protect, updatePost);

module.exports = router;

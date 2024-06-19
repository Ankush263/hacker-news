const { Router } = require('express');
const { protect } = require('../controllers/authControllers');
const {
	createPost,
	findPostById,
	deletePost,
	findAllPostsDec,
} = require('../controllers/postControllers');

const router = Router();

router.route('/').post(protect, createPost).get(findAllPostsDec);
router.route('/:id').get(findPostById).delete(protect, deletePost);

module.exports = router;

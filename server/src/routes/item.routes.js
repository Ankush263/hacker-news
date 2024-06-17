const { Router } = require('express');
const { protect } = require('../controllers/authControllers');
const {
	createItem,
	findItemById,
	deleteItem,
} = require('../controllers/itemControllers');

const router = Router();

router.route('/').post(protect, createItem);
router.route('/:id').get(findItemById).delete(protect, deleteItem);

module.exports = router;

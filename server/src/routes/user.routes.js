const { Router } = require('express');
const { protect } = require('../controllers/authControllers');
const { getMe, updateMe, deleteMe } = require('../controllers/userControllers');

const router = Router();

router.use(protect);

router.route('/me').get(getMe).patch(updateMe).delete(deleteMe);

module.exports = router;

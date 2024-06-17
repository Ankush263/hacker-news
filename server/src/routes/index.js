const { Router } = require('express');

const authRouter = require('./auth.routes');
const userRouter = require('./user.routes');
const itemRouter = require('./item.routes');

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/item', itemRouter);

module.exports = router;

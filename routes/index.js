import express from 'express';
var router = express.Router();
import userRouter from './user';
import materialRouter from './material';
import ticketRouter from './tickets';

router.use('/user', userRouter);
router.use('/material', materialRouter);
router.use('/ticket', ticketRouter);

export default router;
import { Router } from 'express';
import { placeOrderController } from '../controllers/orderController';

const router = Router();

router.post('/place-order', placeOrderController);

export default router;

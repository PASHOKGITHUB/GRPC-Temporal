import { Router } from 'express';
import { placeOrderGrpc } from '../services/grpcClient';

const router = Router();

router.post('/place-order', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || quantity === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await placeOrderGrpc(userId, productId, quantity);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message:`error` });
  }
});

export default router;

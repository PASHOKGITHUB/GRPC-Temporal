import { Request, Response } from 'express';
import { placeOrder } from '../grpc/grpcClient';

export async function placeOrderController(req: Request, res: Response) {
  const { userId, productId, quantity } = req.body;

  try {
    const result = await placeOrder(userId, productId, quantity);
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ error: 'Error placing order' });
  }
}

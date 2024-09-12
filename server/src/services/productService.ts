// src/services/productService.ts
import { getDatabase } from '../db/mongodb';

interface Product {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export async function getProduct(productId: string): Promise<Product | null> {
  const db = getDatabase();
  //console.log("ProductId received on server:", productId);
  const product = await db.collection('products').findOne({ productId });
  console.log("ProductId received:", productId);

  // Ensure the product returned from MongoDB is of type Product
  if (product) {
    const formattedProduct: Product = {
      productId: product.productId,
      productName: product.productName,
      quantity: product.quantity,
      price: product.price,
    };
    return formattedProduct;
  }

  return null;
}

export async function placeOrder(productId: string, orderQuantity: number): Promise<{ success: boolean, message: string }> {
  const db = getDatabase();
  console.log("ProductId received on server:", productId);
  const product = await db.collection('products').findOne({ productId });

  if (!product) {
    return { success: false, message: 'Product not found' };
  }

  if (product.quantity < orderQuantity) {
    return { success: false, message: 'Insufficient quantity' };
  }

  await db.collection('products').updateOne({ productId }, { $inc: { quantity: -orderQuantity } });
  return { success: true, message: 'Order placed successfully' };
}

import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { getProduct, placeOrder } from './services/productService';
import { connectToDatabase } from './db/mongodb';
import path from 'path';

const PROTO_PATH = path.join(__dirname, '../proto/orders.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition).product as any;

async function main() {
  await connectToDatabase();  // Connect to MongoDB

  const server = new grpc.Server();

  // Define gRPC service methods
  server.addService(proto.ProductService.service, {
    GetProduct: async (call: any, callback: any) => {
      const productId = call.request.productId;
      const product = await getProduct(productId);
      if (product) {
        callback(null, {
          productId: product.productId,
          productName: product.productName,
          quantity: product.quantity,
          price: product.price,
        });
      } else {
        callback({
          code: grpc.status.NOT_FOUND,
          details: 'Product not found',
        });
      }
    },
    PlaceOrder: async (call: any, callback: any) => {
      const { productId, orderQuantity } = call.request;
      const result = await placeOrder(productId, orderQuantity);
      callback(null, { success: result.success, message: result.message });
    },
  });

  // Start the gRPC server without calling server.start()
  server.bindAsync('127.0.0.1:50052', grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Server running at http://127.0.0.1:${port}`);
  });
}

main().catch(console.error);

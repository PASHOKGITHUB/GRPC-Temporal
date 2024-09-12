import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const PROTO_PATH = path.join(__dirname, '../../../proto/orders.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition).product as any;  // Note the change here to 'product'

export async function placeOrderActivity(productId: string, orderQuantity: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const client = new proto.ProductService('localhost:50052', grpc.credentials.createInsecure());  // Note the service name change

    const request = { productId, orderQuantity };

    client.PlaceOrder(request, (error: any, response: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(response.message);
      }
    });
  });
}

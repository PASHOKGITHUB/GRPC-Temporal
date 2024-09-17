import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const PROTO_PATH = path.join(__dirname, '../../proto/orders.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition).product as any;

const client = new proto.ProductService('localhost:50053', grpc.credentials.createInsecure());

export function placeOrder(userId: string, productId: string, quantity: number): Promise<string> {
  return new Promise((resolve, reject) => {
    client.PlaceOrder({ userId, productId, quantity }, (err: any, response: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(response.message);
      }
    });
  });
}

import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const PROTO_PATH = path.join(__dirname, '../proto/orders.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const productProto = grpc.loadPackageDefinition(packageDefinition).product as any;

const client = new productProto.ProductService('localhost:50053', grpc.credentials.createInsecure());

export function placeOrderGrpc(userId: string, productId: string, quantity: number): Promise<any> {
  return new Promise((resolve, reject) => {
    client.PlaceOrder({ userId, productId, orderQuantity: quantity }, (error: any, response: any) => {
      if (error) {
        return reject(error);
      }
      resolve(response);
    });
  });
}

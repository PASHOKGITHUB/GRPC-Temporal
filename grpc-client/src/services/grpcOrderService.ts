// import * as grpc from '@grpc/grpc-js';
// import * as protoLoader from '@grpc/proto-loader';
// import path from 'path';

// const PROTO_PATH = path.join(__dirname, '../../proto/orders.proto');
// const packageDefinition = protoLoader.loadSync(PROTO_PATH);
// const proto = grpc.loadPackageDefinition(packageDefinition).orders as any;

// const client = new proto.OrderService('localhost:50051', grpc.credentials.createInsecure());

// export async function placeOrder(userId: string, productId: string, quantity: number): Promise<string> {
//   return new Promise((resolve, reject) => {
//     const request = { userId, productId, quantity };
//     client.PlaceOrder(request, (error: any, response: any) => {
//         console.log("Request sent to gRPC server:", request);
//       if (error) {
//         reject(error);
//       } else {
//         resolve(response.message);
//       }
//     });
//   });
// }

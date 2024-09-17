// // import express, { Request, Response } from 'express';
// // import bodyParser from 'body-parser';
// // import { Connection, WorkflowClient } from '@temporalio/client';

// // const app = express();
// // app.use(bodyParser.json());

// // async function main() {
// //   const connection = await Connection.connect();
// //   const workflowClient = new WorkflowClient({ connection });

// //   // REST API Endpoint to place an order
// //   app.post('/placeOrder', async (req: Request, res: Response) => {
// //     const { userId, productId, quantity } = req.body;

// //     try {
// //       // Start the placeOrder workflow
// //       const handle = await workflowClient.start('placeOrderWorkflow', {
// //         taskQueue: 'order-task-queue',
// //         workflowId: `order-${userId}-${productId}-${Date.now()}`,
// //         args: [userId, productId, quantity],
// //       });

// //       // Get result from the workflow
// //       const result = await handle.result();
// //       res.status(200).json({ message: `Order placed: ${result}` });
// //     } catch (error) {
// //       res.status(500).json({ error: (error as Error).message });
// //     }
// //   });

// //   // Start the Express server
// //   const PORT = 3000;
// //   app.listen(PORT, () => {
// //     console.log(`Server running on port ${PORT}`);
// //   });
// // }

// // main().catch((err) => {
// //   console.error(err);
// // });


// import * as grpc from '@grpc/grpc-js';
// import * as protoLoader from '@grpc/proto-loader';
// import path from 'path';

// const PROTO_PATH = path.join(__dirname, '../proto/orders.proto');
// const packageDefinition = protoLoader.loadSync(PROTO_PATH);
// const proto = grpc.loadPackageDefinition(packageDefinition).product as any;

// const client = new proto.ProductService('localhost:50053', grpc.credentials.createInsecure());

// export function placeOrder(userId: string, productId: string, quantity: number): Promise<string> {
//   return new Promise((resolve, reject) => {
//     client.PlaceOrder({ userId, productId, quantity }, (err: any, response: any) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(response.message);
//       }
//     });
//   });
// }

// import { Connection, WorkflowClient } from '@temporalio/client';
// import * as grpc from '@grpc/grpc-js';
// import * as protoLoader from '@grpc/proto-loader';
// import path from 'path';

// // Load the proto definitions for handling gRPC requests
// const protoPath = path.join(__dirname, '../proto/messages.proto');
// const packageDefinition = protoLoader.loadSync(protoPath, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });
// const messagesProto = grpc.loadPackageDefinition(packageDefinition).messages as any;

// // Function to start Temporal workflows
// async function startWorkflows(userId: string, productId: string, quantity: number) {
//   const connection = await Connection.connect();
//   const client = new WorkflowClient({ connection });

//   // Start the user check and order placement workflows
//   const handle = await client.start('placeOrderWorkflow', {
//     taskQueue: 'order-task-queue',
//     workflowId: `order-${userId}-${productId}-${Date.now()}`,
//     args: [userId, productId, quantity],
//   });

//   const result = await handle.result();
//   console.log(`Order placement result: ${result}`);
//   return result;
// }

// // Implement the gRPC server
// const server = new grpc.Server();

// server.addService(messagesProto.MessageService.service, {
//   CheckUserExistence: async (call: any, callback: any) => {
//     const { userId, productId, quantity } = call.request;
    
//     try {
//       const result = await startWorkflows(userId, productId, quantity);
//       callback(null, { success: true, message: `Order placed successfully: ${result}` });
//     } catch (error) {
//       callback({ code: grpc.status.INTERNAL, message: 'Error placing order' });
//     }
//   },
// });

// server.bindAsync('0.0.0.0:50053', grpc.ServerCredentials.createInsecure(), () => {
//   console.log('gRPC server is running on port 50051');
//   server.start();
// });

import { Connection, WorkflowClient } from '@temporalio/client';

export async function checkUserExistence(userId: string): Promise<boolean> {
  // Establish a connection to Temporal service
  const connection = await Connection.connect();

  // Create a client for Temporal workflow
  const client = new WorkflowClient({
    connection,
  });

  // Start the checkUserExistenceWorkflow
  const handle = await client.start('checkUserExistenceWorkflow', {
    taskQueue: 'order-task-queue',
    workflowId: `check-user-${userId}-${Date.now()}`,
    args: [userId],
  });

  return handle.result();
}

export async function placeOrder(userId: string, productId: string, quantity: number): Promise<string> {
  // Establish a connection to Temporal service
  const connection = await Connection.connect();

  // Create a client for Temporal workflow
  const client = new WorkflowClient({
    connection,
  });

  // Start the placeOrderWorkflow
  const handle = await client.start('placeOrderWorkflow', {
    taskQueue: 'order-task-queue',
    workflowId: `order-${userId}-${productId}-${Date.now()}`,  // Unique workflowId for this workflow instance
    args: [userId, productId, quantity],
  });

  return handle.result();
}

// import { Connection, WorkflowClient } from '@temporalio/client';

// async function checkUserExistence(userId: string) {
//   // Establish the connection to the Temporal service
//   const connection = await Connection.connect();
  
//   // Create the client with connection in options
//   const client = new WorkflowClient({
//     connection, // Pass connection in options
//   });

//   // Start the workflow
//   const handle = await client.start('checkUserExistenceWorkflow', {
//     taskQueue: 'user-task-queue',
//     workflowId: `checkUser-${userId}`,  // Unique workflowId for this workflow instance
//     args: [userId],
//   });

//   const result = await handle.result();
//   console.log(`User existence check result for ${userId}: ${result}`);
// }

// async function placeOrder(orderId: string, productId: string, quantity: number) {
//   // Establish the connection to the Temporal service
//   const connection = await Connection.connect();

//   // Create the client with connection in options
//   const client = new WorkflowClient({
//     connection, // Pass connection in options
//   });

//   // Start the workflow
//   const handle = await client.start('placeOrderWorkflow', {
//     taskQueue: 'order-task-queue',
//     workflowId: `order-${orderId}`,  // Unique workflowId for this workflow instance
//     args: [orderId, productId, quantity],
//   });

//   const result = await handle.result();
//   console.log(`Order placement result for order ${orderId}: ${result}`);
// }

// // Example usage
// checkUserExistence('12345').catch(console.error);
// placeOrder('order-001', 'prod002', 2).catch(console.error);




//----------------------------------------------------------------------------------
// import { Connection, Client } from '@temporalio/client';
// import { messageWorkflow } from './temporal/workflow';

// async function run() {
//   // Create a connection to the Temporal server using the connect method
//   const connection = await Connection.connect();

//   // Create a Temporal client
//   const client = new Client({
//     connection,
//   });

//   // Start the workflow using Temporal client
//   const handle = await client.workflow.start(messageWorkflow, {
//     args: ['Hello from Temporal client!'],   // Pass the message
//     taskQueue: 'message-queue',
//     workflowId: 'message-workflow',
//   });

//   // Wait for the workflow result
//   const result = await handle.result();
//   console.log('Server response via Temporal:', result);
// }

// run().catch((err) => {
//   console.error(err);
//   process.exit(1);
// });
//----------------------------------------------------------------------------
// import * as grpc from '@grpc/grpc-js';
// import * as protoLoader from '@grpc/proto-loader';
// import path from 'path';

// const PROTO_PATH = path.join(__dirname, '../proto/messages.proto');
// const packageDefinition = protoLoader.loadSync(PROTO_PATH);
// const proto = grpc.loadPackageDefinition(packageDefinition).messages as any;

// function checkUserExistence(userId: string) {
//   const client = new proto.MessageService('localhost:50051', grpc.credentials.createInsecure());

//   client.CheckUserExistence({ userId }, (error: any, response: any) => {
//     if (error) {
//       console.error('Error:', error);
//     } else {
//       console.log('User exists:', response.exists);
//     }
//   });
// }

// // Provide a user ID to check
// checkUserExistence('12345');
//---------------------------------------------------------------------------------
// import { Connection, WorkflowClient } from '@temporalio/client';

// async function checkUserExistence(userId: string) {
//   // Establish a connection to the Temporal server
//   const connection = await Connection.connect();
  
//   // Create a WorkflowClient with the connection passed in the options
//   const client = new WorkflowClient({ connection });  // Pass connection as an option

//   // Start a workflow execution with a unique workflow ID
//   const result = await client.execute('checkUserExistenceWorkflow', {
//     taskQueue: 'check-user-existence-task-queue',
//     args: [userId],
//     workflowId: `workflow-${userId}`, // Ensure a unique workflow ID
//   });

//   // Output the result
//   console.log('User exists:', result);
// }

// // Call the function to check user existence
// checkUserExistence('12345').catch(console.error);


// //------------------------------place order alone----------------------------------

// import { Connection, WorkflowClient } from '@temporalio/client';

// async function placeOrder(productId: string, quantity: number) {
//   // Establish the connection to the Temporal service
//   const connection = await Connection.connect();

//   // Create the client with connection in options
//   const client = new WorkflowClient({
//     connection, // Pass connection in options
//   });

//   // Start the workflow
//   const handle = await client.start('placeOrderWorkflow', {
//     taskQueue: 'order-task-queue',
//     workflowId: `order-${productId}-${Date.now()}`,  // Unique workflowId for this workflow instance
//     args: [productId, quantity],
//   });
//   console.log("Starting workflow with:", productId, quantity);

//   const result = await handle.result();
//   console.log(`Order placement result for product ${productId}: ${result}`);
// }

// // Example usage for placing an order
// placeOrder('prod002', 2).catch(console.error);

// //----------------------------------------------------------------------------
import { Connection, WorkflowClient } from '@temporalio/client';

async function placeOrder(userId: string, productId: string, quantity: number) {
  // Establish the connection to the Temporal service
  const connection = await Connection.connect();

  // Create the client with connection in options
  const client = new WorkflowClient({
    connection, // Pass connection in options
  });

  // Start the workflow for both user existence check and order placement
  const handle = await client.start('placeOrderWorkflow', {
    taskQueue: 'order-task-queue',
    workflowId: `order-${userId}-${productId}-${Date.now()}`,  // Unique workflowId for this workflow instance
    args: [userId, productId, quantity], // Pass userId, productId, and quantity to the workflow
  });

  console.log(`Starting workflow for user ${userId}, product ${productId}, quantity ${quantity}`);

  const result = await handle.result();
  console.log(`Order placement result for product ${productId}: ${result}`);
}

// Example usage for placing an order
placeOrder('12345', 'prod002', 2).catch(console.error);




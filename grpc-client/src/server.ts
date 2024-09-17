// import * as grpc from '@grpc/grpc-js';
// import * as protoLoader from '@grpc/proto-loader';
// import { placeOrderActivity } from './temporal/activities/orderActivities';
// import { checkUserExistenceActivity } from './temporal/activities/userActivities';
// import path from 'path';
// //const PROTO_PATH = path.join(__dirname, '../../../proto/orders.proto');

// const messageProtoPath = path.join(__dirname, '../proto/messages.proto');
// const orderProtoPath = path.join(__dirname, '../proto/orders.proto');

// // Load the proto files
// const messagePackageDefinition = protoLoader.loadSync(messageProtoPath);
// const orderPackageDefinition = protoLoader.loadSync(orderProtoPath);

// // Define the proto types
// const messageProto = grpc.loadPackageDefinition(messagePackageDefinition).messages as any;
// const orderProto = grpc.loadPackageDefinition(orderPackageDefinition).product as any;

// // Define the gRPC server
// const server = new grpc.Server();

// // Implement the gRPC service methods
// server.addService(orderProto.ProductService.service, {
//   PlaceOrder: async (call: any, callback: any) => {
//     try {
//       const { productId, orderQuantity } = call.request;
//       const result = await placeOrderActivity(productId, orderQuantity);
//       callback(null, { success: true, message: result });
//     } catch (error) {
//       callback(error, null);
//     }
//   }
// });

// server.addService(messageProto.MessageService.service, {
//   CheckUserExistence: async (call: any, callback: any) => {
//     try {
//       const { userId } = call.request;
//       const exists = await checkUserExistenceActivity(userId);
//       callback(null, { exists });
//     } catch (error) {
//       callback(error, null);
//     }
//   }
// });

// // Start the server
// const PORT = '50053';
// server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), () => {
//   console.log(`gRPC server running on port ${PORT}`);
//   server.start();
// });
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { placeOrder, checkUserExistence } from './client'; // Temporal workflow client functions

// Load proto definitions
const MESSAGE_PROTO_PATH = path.join(__dirname, '../proto/messages.proto');
const ORDER_PROTO_PATH = path.join(__dirname, '../proto/orders.proto');

const messagePackageDef = protoLoader.loadSync(MESSAGE_PROTO_PATH, { keepCase: true });
const orderPackageDef = protoLoader.loadSync(ORDER_PROTO_PATH, { keepCase: true });

const messageProto = grpc.loadPackageDefinition(messagePackageDef) as any;
const orderProto = grpc.loadPackageDefinition(orderPackageDef) as any;

// Define the gRPC server handlers
function checkUserExistenceHandler(call: any, callback: any) {
  const { userId } = call.request;
  checkUserExistence(userId)
    .then((exists) => {
      callback(null, { exists });
    })
    .catch((error) => {
      callback({
        code: grpc.status.INTERNAL,
        message: error.message,
      });
    });
}

function placeOrderHandler(call: any, callback: any) {
  const { userId, productId, orderQuantity } = call.request;  // Now you get userId from the request
  placeOrder(userId, productId, orderQuantity)
    .then((result) => {
      callback(null, { success: true, message: result });
    })
    .catch((error) => {
      callback({
        code: grpc.status.INTERNAL,
        message: error.message,
      });
    });
}


// Start gRPC server
function startGrpcServer() {
  const server = new grpc.Server();
  
  // Add service for user existence check
  server.addService(messageProto.messages.MessageService.service, {
    CheckUserExistence: checkUserExistenceHandler,
  });
  
  // Add service for placing orders
  server.addService(orderProto.product.ProductService.service, {
    PlaceOrder: placeOrderHandler,
  });

  const port = '0.0.0.0:50053';
  server.bindAsync(port, grpc.ServerCredentials.createInsecure(), (err, bindPort) => {
    if (err) {
      console.error(`Failed to start gRPC server: ${err}`);
      return;
    }
    console.log(`gRPC server running at ${port}`);
    //  server.start();
  });
}

startGrpcServer();

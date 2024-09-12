// import * as grpc from '@grpc/grpc-js';
// import * as protoLoader from '@grpc/proto-loader';
// import path from 'path';

// // Load the protobuf
// const PROTO_PATH = path.join(__dirname, '../proto/messages.proto');
// const packageDefinition = protoLoader.loadSync(PROTO_PATH);
// const proto = grpc.loadPackageDefinition(packageDefinition).messages as any;

// // Implementation of the SendMessage RPC method
// function sendMessage(
//   call: grpc.ServerUnaryCall<any, any>, 
//   callback: grpc.sendUnaryData<any>
// ): void {
//   const message = call.request.message;
//   const reply = `Hello from server, you said: ${message}`;
//   callback(null, { reply });
// }

// // Create and start the server
// function startServer() {
//   const server = new grpc.Server();
//   server.addService(proto.MessageService.service, { SendMessage: sendMessage });
//   const serverAddress = '0.0.0.0:50051';
  
//   server.bindAsync(serverAddress, grpc.ServerCredentials.createInsecure(), (err, port) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log(`gRPC server running at http://localhost:${port}`);
//     server.start();
//   });
// }

// startServer();
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { findUserById } from './db/mongodb';
import path from 'path';

const PROTO_PATH = path.join(__dirname, '../proto/messages.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition).messages as any;

async function checkUserExistence(call: any, callback: any) {
  const userId = call.request.userId;
  try {
    const exists = await findUserById(userId);
    callback(null, { exists });
  } catch (error) {
    console.error('Error checking user existence:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: 'Internal server error',
    });
  }
}

function main() {
  const server = new grpc.Server();
  server.addService(proto.MessageService.service, { CheckUserExistence: checkUserExistence });
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log('gRPC server running at http://localhost:50051');
    server.start();
  });
}

main();

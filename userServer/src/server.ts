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
    //server.start();
  });
}

main();

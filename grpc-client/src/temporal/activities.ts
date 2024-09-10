import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

// Load the protobuf
const PROTO_PATH = path.join(__dirname, '../../proto/messages.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition).messages as any;

// Function to send a gRPC message using the gRPC client
export async function sendMessageActivity(message: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const client = new proto.MessageService(
      'localhost:50051',
      grpc.credentials.createInsecure()
    );

    client.SendMessage({ message }, (err: grpc.ServiceError, response: any) => {
      if (err) {
        return reject(err);
      }
      resolve(response.reply);
    });
  });
}

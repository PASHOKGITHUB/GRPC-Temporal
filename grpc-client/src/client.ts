import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

// Load the protobuf
const PROTO_PATH = path.join(__dirname, '../proto/messages.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition).messages as any;

// Define the server address and port
const serverAddress = 'localhost:50051';

// Create the gRPC client
const client = new proto.MessageService(
  serverAddress,
  grpc.credentials.createInsecure()
);

// Function to send a message to the server
function sendMessage(message: string) {
  client.SendMessage({ message }, (err: grpc.ServiceError, response: any) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log('Server response:', response.reply);
    }
  });
}

// Send a test message to the server
sendMessage('Hello from the client!');

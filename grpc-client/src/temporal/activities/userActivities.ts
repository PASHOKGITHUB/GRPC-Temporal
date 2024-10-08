import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const PROTO_PATH = path.join(__dirname, '../../../proto/messages.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition).messages as any;

export async function checkUserExistenceActivity(userId: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const client = new proto.MessageService('localhost:50051', grpc.credentials.createInsecure());

    client.CheckUserExistence({ userId }, (error: any, response: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(response.exists);
      }
    });
  });
}

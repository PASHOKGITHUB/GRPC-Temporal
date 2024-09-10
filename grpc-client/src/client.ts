import { Connection, Client } from '@temporalio/client';
import { messageWorkflow } from './temporal/workflow';

async function run() {
  // Create a connection to the Temporal server using the connect method
  const connection = await Connection.connect();

  // Create a Temporal client
  const client = new Client({
    connection,
  });

  // Start the workflow using Temporal client
  const handle = await client.workflow.start(messageWorkflow, {
    args: ['Hello from Temporal client!'],   // Pass the message
    taskQueue: 'message-queue',
    workflowId: 'message-workflow',
  });

  // Wait for the workflow result
  const result = await handle.result();
  console.log('Server response via Temporal:', result);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

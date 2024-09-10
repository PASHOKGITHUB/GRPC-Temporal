import { Worker } from '@temporalio/worker';
import * as activities from './temporal/activities'; // Your activities

async function run() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('./temporal/workflow'),
    activities,
    taskQueue: 'message-queue',
  });
  
  await worker.run();
}

run().catch((err) => {
  console.error('Worker failed: ', err);
  process.exit(1);
});

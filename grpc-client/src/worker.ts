import { Worker } from '@temporalio/worker';
import * as userActivities from './temporal/activities/userActivities';
import * as orderActivities from './temporal/activities/orderActivities';

async function runWorker() {
  // Worker for both user-related and order-related workflows
  const worker = await Worker.create({
    workflowsPath: require.resolve('./temporal/workflows'), // Now pointing to the index file
    activities: {
      ...userActivities, // Include user activities
      ...orderActivities, // Include order activities
    },
    taskQueue: 'order-task-queue',
  });

  console.log('Worker started...');
  await worker.run();
}

runWorker().catch((err) => {
  console.error(err);
  process.exit(1);
});


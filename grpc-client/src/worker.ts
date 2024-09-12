// import { Worker } from '@temporalio/worker';
// import * as userActivities from './temporal/activities/userActivities';
// import * as orderActivities from './temporal/activities/orderActivities';

// async function runWorker() {
//   const userWorker = await Worker.create({
//     workflowsPath: require.resolve('./temporal/workflows/userWorkflow'),
//     activities: userActivities,
//     taskQueue: 'user-task-queue',
//   });

//   const orderWorker = await Worker.create({
//     workflowsPath: require.resolve('./temporal/workflows/orderWorkflow'),
//     activities: orderActivities,
//     taskQueue: 'order-task-queue',
//   });

//   console.log('Workers for both user and order started...');
//   await Promise.all([userWorker.run(), orderWorker.run()]);
// }

// runWorker().catch((err) => {
//   console.error(err);
//   process.exit(1);
// });
// //-----------------------------------------------------------------------------------
// import { Worker } from '@temporalio/worker';
// import * as orderActivities from './temporal/activities/orderActivities';

// async function runWorker() {
//   // Worker for order-related workflows
//   const orderWorker = await Worker.create({
//     workflowsPath: require.resolve('./temporal/workflows/orderWorkflow'),
//     activities: orderActivities,
//     taskQueue: 'order-task-queue',
//   });

//   console.log('Order worker started...');
//   await orderWorker.run();
// }

// runWorker().catch((err) => {
//   console.error(err);
//   process.exit(1);
// });
// //--------------------------------------------------------------------------------

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


// // src/temporal/workflow.ts
// import { proxyActivities } from '@temporalio/workflow';
// import type * as activities from '../activities/userActivities';

// // Setup activity proxies to call activities within the workflow
// const { checkUserExistenceActivity } = proxyActivities<typeof activities>({
//   startToCloseTimeout: '10 minutes',
// });

// export async function checkUserExistenceWorkflow(userId: string): Promise<boolean> {
//   // Call the activity within the workflow
//   return await checkUserExistenceActivity(userId);
// }
import { proxyActivities } from '@temporalio/workflow';
import type * as userActivities from '../activities/userActivities';

const { checkUserExistenceActivity } = proxyActivities<typeof userActivities>({
  startToCloseTimeout: '10 minutes',
});

export async function checkUserExistenceWorkflow(userId: string): Promise<boolean> {
  return await checkUserExistenceActivity(userId);
}

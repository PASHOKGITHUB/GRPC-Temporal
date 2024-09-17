
import { proxyActivities } from '@temporalio/workflow';
import type * as userActivities from '../activities/userActivities';

const { checkUserExistenceActivity } = proxyActivities<typeof userActivities>({
  startToCloseTimeout: '10 minutes',
});

export async function checkUserExistenceWorkflow(userId: string): Promise<boolean> {
  return await checkUserExistenceActivity(userId);
}

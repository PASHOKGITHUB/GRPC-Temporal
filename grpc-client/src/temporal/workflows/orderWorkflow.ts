
import { proxyActivities } from '@temporalio/workflow';
import type * as userActivities from '../activities/userActivities';
import type * as orderActivities from '../activities/orderActivities';

const { checkUserExistenceActivity } = proxyActivities<typeof userActivities>({
  startToCloseTimeout: '5 minutes',
});

const { placeOrderActivity } = proxyActivities<typeof orderActivities>({
  startToCloseTimeout: '10 minutes',
});

export async function placeOrderWorkflow(userId: string, productId: string, quantity: number): Promise<string> {
  // Check if the user exists
  const userExists = await checkUserExistenceActivity(userId);

  if (!userExists) {
    throw new Error(`User with ID ${userId} does not exist.`);
  }

  // If user exists, proceed with order placement
  const orderResult = await placeOrderActivity(productId, quantity);3
  
  return orderResult; // Return result of the order placement
}

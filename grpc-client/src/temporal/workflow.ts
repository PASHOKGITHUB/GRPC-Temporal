// src/temporal/workflow.ts

import { proxyActivities } from '@temporalio/workflow';
import { sendMessageActivity } from './activities';

// Declare the workflow function
export async function messageWorkflow(message: string): Promise<string> {
  // Proxy activities so they can be invoked within the workflow
  const { sendMessageActivity } = proxyActivities({
    startToCloseTimeout: '1 minute',
  });

  // Call the activity to send the message and return the result
  return await sendMessageActivity(message);
}

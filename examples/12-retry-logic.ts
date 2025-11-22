/**
 * Example 12: Retry Logic
 *
 * Implement retry logic for failed requests with exponential backoff.
 */

import { LiteLLMClient } from '../src/client.js';

const client = new LiteLLMClient({
  baseURL: process.env.LITELLM_BASE_URL || 'http://localhost:4000',
  apiKey: process.env.LITELLM_API_KEY,
});

async function completeWithRetry(prompt: string, maxRetries = 3): Promise<string> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await client.complete(prompt);
    } catch (error) {
      if (attempt === maxRetries) throw error;
      const delay = 1000 * attempt;
      console.log(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw new Error('Max retries exceeded');
}

const response = await completeWithRetry('Hello!');
console.log('Response:', response);

/**
 * Example 3: Streaming Responses
 *
 * Stream responses as they are generated for real-time updates.
 */

import { LiteLLMClient } from '../src/client.js';

const client = new LiteLLMClient({
  baseURL: process.env.LITELLM_BASE_URL || 'http://localhost:4000',
  apiKey: process.env.LITELLM_API_KEY,
});

console.log('Streaming response:');
const fullResponse = await client.streamChat(
  [{ role: 'user', content: 'Write a short story about a robot learning to paint.' }],
  undefined,
  (chunk) => {
    process.stdout.write(chunk);
  }
);

console.log('\n\nFull response:', fullResponse);

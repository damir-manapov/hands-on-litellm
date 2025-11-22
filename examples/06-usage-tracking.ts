/**
 * Example 6: Usage Tracking
 *
 * Track token usage for cost estimation and monitoring.
 */

import { LiteLLMClient } from '../src/client.js';

const client = new LiteLLMClient({
  baseURL: process.env.LITELLM_BASE_URL || 'http://localhost:4000',
  apiKey: process.env.LITELLM_API_KEY,
});

const result = await client.chatWithUsage([
  { role: 'user', content: 'Explain the concept of recursion in programming.' },
]);

console.log('Response:', result.content);
console.log('\nUsage:', result.usage);
if (result.usage) {
  console.log(
    `Tokens: ${result.usage.total_tokens} (prompt: ${result.usage.prompt_tokens}, completion: ${result.usage.completion_tokens})`
  );
}

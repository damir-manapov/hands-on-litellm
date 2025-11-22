/**
 * Example 5: Model Selection
 *
 * Specify different OpenAI models for different use cases.
 */

import { LiteLLMClient } from '../src/client.js';

const client = new LiteLLMClient({
  baseURL: process.env.LITELLM_BASE_URL || 'http://localhost:4000',
  apiKey: process.env.LITELLM_API_KEY,
  defaultModel: 'gpt-3.5-turbo',
});

// Use default model (gpt-3.5-turbo)
const response1 = await client.complete('Hello!');
console.log('Default model (gpt-3.5-turbo):', response1);

// Use GPT-4
const response2 = await client.complete('Hello!', 'gpt-4');
console.log('\nGPT-4:', response2);

// Use GPT-4 Turbo
const response3 = await client.complete('Hello!', 'gpt-4-turbo');
console.log('\nGPT-4 Turbo:', response3);

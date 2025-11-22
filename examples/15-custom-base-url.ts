/**
 * Example 15: Custom Base URL
 *
 * Configure client to use a custom LiteLLM proxy URL.
 */

import { LiteLLMClient } from '../src/client.js';

const client = new LiteLLMClient({
  baseURL: process.env.LITELLM_BASE_URL || 'http://localhost:4000',
  apiKey: process.env.LITELLM_API_KEY,
  defaultModel: 'gpt-3.5-turbo',
});

const response = await client.complete('Hello from custom URL!');
console.log(response);

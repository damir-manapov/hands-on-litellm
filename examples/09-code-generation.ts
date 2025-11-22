/**
 * Example 9: Code Generation
 *
 * Generate code with specific requirements and style.
 */

import { LiteLLMClient } from '../src/client.js';

const client = new LiteLLMClient({
  baseURL: process.env.LITELLM_BASE_URL || 'http://localhost:4000',
  apiKey: process.env.LITELLM_API_KEY,
});

const response = await client.chat([
  {
    role: 'system',
    content: 'You are an expert programmer. Write clean, well-commented code.',
  },
  {
    role: 'user',
    content: 'Write a TypeScript function that calculates fibonacci numbers',
  },
]);

console.log(response);

/**
 * Example 16: Using OpenAI SDK with LiteLLM
 *
 * Use the official OpenAI npm package with LiteLLM proxy through LiteLLMClient.
 */

import { LiteLLMClient } from '../src/client.js';

const litellmClient = new LiteLLMClient({
  baseURL: process.env.LITELLM_BASE_URL || 'http://localhost:4000',
  apiKey: process.env.LITELLM_API_KEY,
});

const client = litellmClient.getOpenAIClient();

const completion = await client.chat.completions.create({
  model: 'gpt-3.5-turbo',
  messages: [{ role: 'user', content: 'What is the capital of France?' }],
});

console.log('Response:', completion.choices[0]?.message?.content);
console.log('Usage:', completion.usage);

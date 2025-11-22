/**
 * Example 18: Using Different OpenAI Models via LiteLLM
 *
 * Switch between different OpenAI models through LiteLLM using LiteLLMClient.
 */

import { LiteLLMClient } from '../src/client.js';

const litellmClient = new LiteLLMClient({
  baseURL: process.env.LITELLM_BASE_URL || 'http://localhost:4000',
  apiKey: process.env.LITELLM_API_KEY,
});

const client = litellmClient.getOpenAIClient();

// GPT-3.5 Turbo
const response1 = await client.chat.completions.create({
  model: 'gpt-3.5-turbo',
  messages: [{ role: 'user', content: 'Hello!' }],
});
console.log('GPT-3.5 Turbo:', response1.choices[0]?.message?.content);

// GPT-4
const response2 = await client.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Hello!' }],
});
console.log('\nGPT-4:', response2.choices[0]?.message?.content);

// GPT-4 Turbo
const response3 = await client.chat.completions.create({
  model: 'gpt-4-turbo',
  messages: [{ role: 'user', content: 'Hello!' }],
});
console.log('\nGPT-4 Turbo:', response3.choices[0]?.message?.content);

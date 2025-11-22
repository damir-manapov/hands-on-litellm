/**
 * Example 19: Multi-Turn Conversation with OpenAI SDK
 *
 * Maintain conversation context using OpenAI SDK with LiteLLM through LiteLLMClient.
 */

import { LiteLLMClient } from '../src/client.js';

const litellmClient = new LiteLLMClient({
  baseURL: process.env.LITELLM_BASE_URL || 'http://localhost:4000',
  apiKey: process.env.LITELLM_API_KEY,
});

const client = litellmClient.getOpenAIClient();

const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
  { role: 'system', content: 'You are a helpful cooking assistant.' },
  { role: 'user', content: 'How do I make pasta?' },
];

let response = await client.chat.completions.create({
  model: 'gpt-3.5-turbo',
  messages,
});

console.log('Assistant:', response.choices[0]?.message?.content);

messages.push({
  role: 'assistant',
  content: response.choices[0]?.message?.content ?? '',
});
messages.push({ role: 'user', content: 'What about adding garlic?' });

response = await client.chat.completions.create({
  model: 'gpt-3.5-turbo',
  messages,
});

console.log('\nAssistant:', response.choices[0]?.message?.content);

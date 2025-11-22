/**
 * Example 4: Multi-Turn Conversation
 *
 * Maintain context across multiple messages in a conversation.
 */

import { LiteLLMClient } from '../src/client.js';

const client = new LiteLLMClient({
  baseURL: process.env.LITELLM_BASE_URL || 'http://localhost:4000',
  apiKey: process.env.LITELLM_API_KEY,
});

const conversation: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
  { role: 'system', content: 'You are a helpful cooking assistant.' },
  { role: 'user', content: 'How do I make pasta?' },
];

let response = await client.chat(conversation);
console.log('Assistant:', response);

conversation.push({ role: 'assistant', content: response });
conversation.push({ role: 'user', content: 'What about adding garlic?' });

response = await client.chat(conversation);
console.log('\nAssistant:', response);

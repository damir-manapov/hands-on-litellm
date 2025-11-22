/**
 * Example 14: Context Management
 *
 * Manage long conversations by truncating old messages to stay within context limits.
 */

import { LiteLLMClient, Message } from '../src/client.js';

const client = new LiteLLMClient({
  baseURL: process.env.LITELLM_BASE_URL || 'http://localhost:4000',
  apiKey: process.env.LITELLM_API_KEY,
});

function truncateConversation(messages: Message[], maxMessages: number): Message[] {
  const systemMessage = messages.find((m) => m.role === 'system');
  const otherMessages = messages.filter((m) => m.role !== 'system');
  const recentMessages = otherMessages.slice(-maxMessages);
  return systemMessage ? [systemMessage, ...recentMessages] : recentMessages;
}

const conversation: Message[] = [
  { role: 'system', content: 'You are a helpful assistant.' },
  { role: 'user', content: 'Message 1' },
  { role: 'assistant', content: 'Response 1' },
  { role: 'user', content: 'Message 2' },
  { role: 'assistant', content: 'Response 2' },
  { role: 'user', content: 'Message 3' },
];

// Keep only last 4 messages (including system)
const truncated = truncateConversation(conversation, 4);
console.log('Truncated conversation:', truncated);

const response = await client.chat(truncated);
console.log('Response:', response);

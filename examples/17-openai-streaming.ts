/**
 * Example 17: OpenAI SDK Streaming with LiteLLM
 *
 * Stream responses using OpenAI SDK with LiteLLM through LiteLLMClient.
 */

import { LiteLLMClient } from '../src/client.js';

const litellmClient = new LiteLLMClient({
  baseURL: process.env.LITELLM_BASE_URL || 'http://localhost:4000',
  apiKey: process.env.LITELLM_API_KEY,
});

const client = litellmClient.getOpenAIClient();

const stream = await client.chat.completions.create({
  model: 'gpt-3.5-turbo',
  messages: [{ role: 'user', content: 'Write a short story about a robot learning to paint.' }],
  stream: true,
});

console.log('Streaming response:');
for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content;
  if (content) {
    process.stdout.write(content);
  }
}
console.log('\n');

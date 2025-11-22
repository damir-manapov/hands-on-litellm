/**
 * Example 20: Function Calling with OpenAI SDK
 *
 * Use function calling / tool use with OpenAI SDK through LiteLLM using LiteLLMClient.
 */

import { LiteLLMClient } from '../src/client.js';

const litellmClient = new LiteLLMClient({
  baseURL: process.env.LITELLM_BASE_URL || 'http://localhost:4000',
  apiKey: process.env.LITELLM_API_KEY,
});

const client = litellmClient.getOpenAIClient();

const response = await client.chat.completions.create({
  model: 'gpt-3.5-turbo',
  messages: [
    {
      role: 'user',
      content: 'What is the weather like in San Francisco?',
    },
  ],
  tools: [
    {
      type: 'function',
      function: {
        name: 'get_weather',
        description: 'Get the current weather in a given location',
        parameters: {
          type: 'object',
          properties: {
            location: {
              type: 'string',
              description: 'The city and state, e.g. San Francisco, CA',
            },
            unit: {
              type: 'string',
              enum: ['celsius', 'fahrenheit'],
            },
          },
          required: ['location'],
        },
      },
    },
  ],
  tool_choice: 'auto',
});

const message = response.choices[0]?.message;
console.log('Message:', message?.content);
console.log('Tool calls:', message?.tool_calls);

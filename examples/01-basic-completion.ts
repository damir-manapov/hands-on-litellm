/**
 * Example 1: Basic Completion
 *
 * Simple text completion with a single prompt using OpenAI through LiteLLM.
 */

import { LiteLLMClient } from '../src/client.js';

const client = new LiteLLMClient({
  baseURL: process.env.LITELLM_BASE_URL || 'http://localhost:4000',
  apiKey: process.env.LITELLM_API_KEY,
  defaultModel: 'gpt-3.5-turbo',
});

const response = await client.complete('What is the capital of France?');
console.log('Response:', response);

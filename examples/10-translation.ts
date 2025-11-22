/**
 * Example 10: Translation
 *
 * Use the model for translation tasks.
 */

import { LiteLLMClient } from '../src/client.js';

const client = new LiteLLMClient({
  baseURL: process.env.LITELLM_BASE_URL || 'http://localhost:4000',
  apiKey: process.env.LITELLM_API_KEY,
});

const response = await client.chat([
  { role: 'system', content: 'You are a professional translator.' },
  {
    role: 'user',
    content: 'Translate "Hello, how are you?" to Spanish, French, and German',
  },
]);

console.log(response);

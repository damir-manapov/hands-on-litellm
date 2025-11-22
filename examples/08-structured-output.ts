/**
 * Example 8: Structured Output Extraction
 *
 * Extract structured data from text using prompts.
 */

import { LiteLLMClient } from '../src/client.js';

const client = new LiteLLMClient({
  baseURL: process.env.LITELLM_BASE_URL || 'http://localhost:4000',
  apiKey: process.env.LITELLM_API_KEY,
});

const response = await client.chat([
  {
    role: 'system',
    content: 'You are a helpful assistant. Always respond with valid JSON only.',
  },
  {
    role: 'user',
    content: 'Extract name, age, and city from: "John is 30 years old and lives in New York"',
  },
]);

try {
  const data = JSON.parse(response);
  console.log('Extracted data:', data);
} catch {
  console.log('Response:', response);
}

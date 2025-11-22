/**
 * Example 13: Prompt Chaining
 *
 * Use one LLM response as input to another for multi-step workflows.
 */

import { LiteLLMClient } from '../src/client.js';

const client = new LiteLLMClient({
  baseURL: process.env.LITELLM_BASE_URL || 'http://localhost:4000',
  apiKey: process.env.LITELLM_API_KEY,
});

// Step 1: Generate ideas
const ideas = await client.complete('Generate 3 product ideas for a mobile app');
console.log('Ideas:', ideas);

// Step 2: Evaluate ideas
const evaluation = await client.chat([
  { role: 'system', content: 'Evaluate product ideas' },
  { role: 'user', content: `Evaluate these ideas:\n${ideas}` },
]);

console.log('\nEvaluation:', evaluation);

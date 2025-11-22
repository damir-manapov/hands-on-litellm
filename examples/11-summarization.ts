/**
 * Example 11: Summarization
 *
 * Summarize long text into concise summaries.
 */

import { LiteLLMClient } from '../src/client.js';

const client = new LiteLLMClient({
  baseURL: process.env.LITELLM_BASE_URL || 'http://localhost:4000',
  apiKey: process.env.LITELLM_API_KEY,
});

const longText = `
Artificial intelligence (AI) is intelligence demonstrated by machines, in contrast to the natural intelligence displayed by humans and animals. Leading AI textbooks define the field as the study of "intelligent agents": any device that perceives its environment and takes actions that maximize its chance of achieving its goals. Colloquially, the term "artificial intelligence" is often used to describe machines that mimic "cognitive" functions that humans associate with the human mind, such as "learning" and "problem solving".
`;

const response = await client.chat([
  {
    role: 'system',
    content: 'You are an expert at summarizing text. Provide concise summaries.',
  },
  {
    role: 'user',
    content: `Summarize this article in 3 sentences:\n\n${longText}`,
  },
]);

console.log(response);

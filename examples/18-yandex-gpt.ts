/**
 * Example 18: Yandex GPT Integration
 *
 * Use Yandex GPT API through LiteLLMClient.
 * Yandex GPT provides an OpenAI-compatible API with some custom endpoints.
 *
 * Prerequisites:
 * - Set YANDEX_CLOUD_FOLDER in .env file or as environment variable (Yandex Cloud folder ID)
 * - Set YANDEX_CLOUD_API_KEY in .env file or as environment variable (Yandex Cloud API key)
 */

import 'dotenv/config';
import { LiteLLMClient } from '../src/client.js';
import OpenAI from 'openai';

// Yandex GPT API configuration
const YANDEX_CLOUD_FOLDER = process.env.YANDEX_CLOUD_FOLDER;
const YANDEX_CLOUD_API_KEY = process.env.YANDEX_CLOUD_API_KEY;
const YANDEX_CLOUD_BASE_URL = 'https://rest-assistant.api.cloud.yandex.net/v1';
const YANDEX_CLOUD_MODEL = 'yandexgpt/rc';

if (!YANDEX_CLOUD_FOLDER) {
  throw new Error(
    'YANDEX_CLOUD_FOLDER environment variable is required. Get it from Yandex Cloud console.'
  );
}

if (!YANDEX_CLOUD_API_KEY) {
  throw new Error(
    'YANDEX_CLOUD_API_KEY environment variable is required. Get it from Yandex Cloud console.'
  );
}

// Create OpenAI client configured for Yandex GPT
// Yandex GPT requires custom headers, so we create the client directly
const yandexClient = new OpenAI({
  apiKey: YANDEX_CLOUD_API_KEY,
  baseURL: YANDEX_CLOUD_BASE_URL,
  defaultHeaders: {
    'OpenAI-Project': YANDEX_CLOUD_FOLDER,
  },
});

// Example 1: Using Yandex GPT responses.create() endpoint (custom API)
console.log('=== Example 1: Yandex GPT responses.create() (custom endpoint) ===');
try {
  const response = await yandexClient.responses.create({
    model: `gpt://${YANDEX_CLOUD_FOLDER}/${YANDEX_CLOUD_MODEL}`,
    instructions: 'You are a helpful assistant.',
    input: 'Привет! Расскажи о квантовых вычислениях.',
    temperature: 0.3,
    max_output_tokens: 500,
  });

  console.log('Response:', response.output_text);
} catch (error) {
  // Handle case where responses.create() might not be available in the OpenAI SDK version
  if (error instanceof Error) {
    console.log(
      'Note: responses.create() may not be available in this OpenAI SDK version.'
    );
    console.log('Error:', error.message);
  }
}
console.log();

// Example 2: Using standard chat completions (if supported by Yandex GPT)
console.log('=== Example 2: Standard Chat Completions (OpenAI-compatible) ===');
try {
  const chatResponse = await yandexClient.chat.completions.create({
    model: `gpt://${YANDEX_CLOUD_FOLDER}/${YANDEX_CLOUD_MODEL}`,
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Привет! Расскажи о квантовых вычислениях.' },
    ],
    temperature: 0.3,
    max_tokens: 500,
  });

  console.log('Response:', chatResponse.choices[0]?.message?.content);
  console.log('Usage:', chatResponse.usage);
} catch (error) {
  console.log(
    'Chat completions may not be supported, or model format may differ:',
    error instanceof Error ? error.message : String(error)
  );
}
console.log();

// Example 3: Using LiteLLMClient with Yandex GPT (if chat completions are supported)
console.log('=== Example 3: Using LiteLLMClient with Yandex GPT ===');
try {
  // Create LiteLLMClient configured for Yandex GPT
  // Note: This only works if Yandex GPT supports standard chat completions endpoint
  const litellmClient = new LiteLLMClient({
    baseURL: YANDEX_CLOUD_BASE_URL,
    apiKey: YANDEX_CLOUD_API_KEY,
    defaultModel: `gpt://${YANDEX_CLOUD_FOLDER}/${YANDEX_CLOUD_MODEL}`,
  });

  // Note: OpenAI SDK doesn't easily allow modifying headers after creation
  // For custom headers like "OpenAI-Project", you need to create the client directly as shown in Example 1

  const response = await litellmClient.chat([
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Привет! Расскажи о квантовых вычислениях.' },
  ]);

  console.log('Response:', response);
} catch (error) {
  console.log(
    'LiteLLMClient approach may require custom headers configuration:',
    error instanceof Error ? error.message : String(error)
  );
  console.log(
    'For Yandex GPT, use the direct OpenAI client approach with custom headers as shown in Example 1.'
  );
}
console.log();

// Example 4: Model information
console.log('=== Example 4: Model Information ===');
console.log('Yandex Cloud Folder:', YANDEX_CLOUD_FOLDER);
console.log('Model:', `gpt://${YANDEX_CLOUD_FOLDER}/${YANDEX_CLOUD_MODEL}`);
console.log('Base URL:', YANDEX_CLOUD_BASE_URL);


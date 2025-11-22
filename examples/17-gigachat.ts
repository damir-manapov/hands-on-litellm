/**
 * Example 17: Sber GigaChat Integration
 *
 * Use Sber GigaChat API through LiteLLMClient.
 * GigaChat API is compatible with OpenAI SDK, so we can use LiteLLMClient with GigaChat's base URL.
 *
 * Documentation: https://developers.sber.ru/docs/ru/gigachat/guides/compatible-openai
 *
 * Prerequisites:
 * - Set GIGACHAT_AUTH_KEY in .env file or as environment variable (authorization key from GigaChat)
 * - The access token will be automatically obtained (valid for 30 minutes)
 */

import 'dotenv/config';
import { LiteLLMClient } from '../src/client.js';
import { randomUUID } from 'crypto';
import https from 'https';

// GigaChat API uses self-signed certificates, so we need to disable SSL verification
// Note: This is required for GigaChat endpoints. In production, configure proper certificate validation.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// GigaChat API configuration
const GIGACHAT_BASE_URL = 'https://gigachat.devices.sberbank.ru/api/v1';
const GIGACHAT_OAUTH_URL = 'https://ngw.devices.sberbank.ru:9443/api/v2/oauth';
const GIGACHAT_MODEL = 'GigaChat';

/**
 * Get GigaChat access token using authorization key
 * Access token is valid for 30 minutes
 */
async function getGigaChatAccessToken(authKey: string): Promise<string> {
  const rqUID = randomUUID();
  const url = new URL(GIGACHAT_OAUTH_URL);

  return new Promise((resolve, reject) => {
    const postData = 'scope=GIGACHAT_API_PERS';

    const options = {
      hostname: url.hostname,
      port: url.port || 9443,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        RqUID: rqUID,
        Authorization: `Bearer ${authKey}`,
        'Content-Length': Buffer.byteLength(postData),
      },
      // Accept self-signed certificates (required for GigaChat OAuth endpoint)
      // In production, you should properly configure certificate validation
      rejectUnauthorized: false,
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const jsonData = JSON.parse(data) as { access_token?: string };
            if (!jsonData.access_token) {
              reject(new Error('Access token not found in response'));
              return;
            }
            resolve(jsonData.access_token);
          } catch (error) {
            reject(
              new Error(`Failed to parse response: ${error instanceof Error ? error.message : String(error)}\nResponse: ${data}`)
            );
          }
        } else {
          reject(
            new Error(
              `Failed to get access token: ${res.statusCode} ${res.statusMessage}\n${data}`
            )
          );
        }
      });
    });

    req.on('error', (error) => {
      reject(
        new Error(`Request failed: ${error.message}`)
      );
    });

    req.write(postData);
    req.end();
  });
}

// Get access token automatically
const authKey = process.env.GIGACHAT_AUTH_KEY;
if (!authKey) {
  throw new Error(
    'GIGACHAT_AUTH_KEY environment variable is required. Get it from https://developers.sber.ru/'
  );
}

console.log('Getting GigaChat access token...');
const accessToken = await getGigaChatAccessToken(authKey);
console.log('Access token obtained successfully!\n');

// Create LiteLLMClient configured for GigaChat
const litellmClient = new LiteLLMClient({
  baseURL: GIGACHAT_BASE_URL,
  apiKey: accessToken,
  defaultModel: GIGACHAT_MODEL,
});

// Example 1: Basic chat completion using LiteLLMClient
console.log('=== Example 1: Basic Chat Completion (using LiteLLMClient) ===');
const response = await litellmClient.chat([
  { role: 'system', content: 'You are a helpful assistant.' },
  { role: 'user', content: 'Привет! Расскажи о квантовых вычислениях.' },
]);

console.log('Response:', response);
console.log();

// Example 1b: Chat completion with usage tracking
console.log('=== Example 1b: Chat Completion with Usage Tracking ===');
const responseWithUsage = await litellmClient.chatWithUsage([
  { role: 'system', content: 'You are a helpful assistant.' },
  { role: 'user', content: 'Привет! Расскажи о квантовых вычислениях.' },
]);

console.log('Response:', responseWithUsage.content);
console.log('Usage:', responseWithUsage.usage);
console.log();

// Example 2: Function calling (tools) - using getOpenAIClient() for advanced features
console.log('=== Example 2: Function Calling (using getOpenAIClient) ===');
const functions = [
  {
    name: 'get_weather',
    description: 'Retrieve the current weather for a specified location.',
    parameters: {
      type: 'object',
      properties: {
        location: {
          type: 'string',
          description: 'The city and country or region name.',
        },
        unit: {
          type: 'string',
          enum: ['metric', 'imperial'],
          description: 'The unit system for temperature (metric or imperial).',
        },
      },
      required: ['location'],
    },
  },
];

// Use getOpenAIClient() to access advanced OpenAI SDK features like function calling
const openaiClient = litellmClient.getOpenAIClient();
const functionCompletion = await openaiClient.chat.completions.create({
  model: GIGACHAT_MODEL,
  messages: [
    {
      role: 'user',
      content: 'Какая погода в Москве?',
    },
  ],
  tools: functions.map((f) => ({
    type: 'function' as const,
    function: f,
  })),
  tool_choice: 'auto',
});

const message = functionCompletion.choices[0]?.message;
console.log('Message:', message?.content);
console.log('Tool calls:', message?.tool_calls);
console.log();

// Example 3: Embeddings - using getOpenAIClient() for embeddings API
console.log('=== Example 3: Embeddings (using getOpenAIClient) ===');
try {
  const embeddings = await openaiClient.embeddings.create({
    model: 'EmbeddingsGigaR',
    input: 'Hello World!',
  });

  console.log('Embedding dimensions:', embeddings.data[0]?.embedding?.length);
  console.log('First 5 values:', embeddings.data[0]?.embedding?.slice(0, 5));
} catch (error) {
  console.log(
    'Embeddings API not available (may require special access or plan):',
    error instanceof Error ? error.message : String(error)
  );
}
console.log();

// Example 4: List available models - using getOpenAIClient()
console.log('=== Example 4: Available Models (using getOpenAIClient) ===');
const models = await openaiClient.models.list();
console.log('Available models:');
models.data.forEach((model) => {
  console.log(`  - ${model.id}`);
});

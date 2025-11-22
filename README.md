# Hands-on LiteLLM

Working with LLM through LiteLLM.

## Author

Damir Manapov

## License

MIT

## Stack

- TypeScript
- pnpm
- Vitest
- tsx
- ESLint
- Prettier
- gitleaks

## Installation

```bash
pnpm install
```

## Development

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Lint code
pnpm lint

# Format code
pnpm format

# Type check
pnpm typecheck

# Build (type check only)
pnpm build
```

## Scripts

- `check.sh` - Runs formatting, lint, build check, gitleaks, and tests
- `health.sh` - Checks for outdated dependencies and vulnerabilities
- `all-checks.sh` - Runs both check.sh and health.sh

## Docker Compose

This project includes a Docker Compose setup for running LiteLLM.

### Prerequisites

- Docker and Docker Compose installed

### Configuration

1. Create a `litellm-config.yaml` file (example provided) with your model configurations
2. Create a `.env` file (copy from `.env.example`):

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` and set your API keys:

   ```bash
   # Required for OpenAI models (used by LiteLLM Docker Compose)
   OPENAI_API_KEY=sk-your-actual-openai-api-key-here

   # Required for Example 17: GigaChat integration
   GIGACHAT_AUTH_KEY=your-gigachat-authorization-key-here
   ```

   Optional environment variables:
   - `LITELLM_MASTER_KEY` - Master key for LiteLLM (default: sk-1234)
   - `LITELLM_SALT_KEY` - Salt key for encryption (default: sk-5678)
   - `POSTGRES_DB` - PostgreSQL database name (default: litellm)
   - `POSTGRES_USER` - PostgreSQL user (default: litellm_user)
   - `POSTGRES_PASSWORD` - PostgreSQL password (default: litellm_password)
   - `LITELLM_BASE_URL` - LiteLLM proxy URL (default: http://localhost:4000)
   - `LITELLM_API_KEY` - LiteLLM master key for authentication

**Note**:

- You must set `OPENAI_API_KEY` in your `.env` file for LiteLLM to work with OpenAI models. The `.env` file is used by Docker Compose automatically.
- Set `GIGACHAT_AUTH_KEY` in your `.env` file to use Example 17 (GigaChat integration). The example will automatically load this from `.env` using dotenv.

**For running examples directly** (without Docker), environment variables from `.env` are automatically loaded for examples that use dotenv (like Example 17). You can also set environment variables manually:

```bash
export OPENAI_API_KEY=sk-your-actual-openai-api-key-here
export GIGACHAT_AUTH_KEY=your-gigachat-authorization-key-here
tsx examples/01-basic-completion.ts
```

The `DATABASE_URL` environment variable is automatically configured based on the PostgreSQL settings.

### Commands

- `pnpm compose:up` - Start LiteLLM services
- `pnpm compose:down` - Stop LiteLLM services
- `pnpm compose:restart` - Restart LiteLLM services
- `pnpm compose:reset` - Reset services (removes volumes and orphans, then starts)

### Accessing LiteLLM

Once started, LiteLLM is available at:

- **API**: `http://localhost:4000`
- **Admin UI**: `http://localhost:4000/ui`

### Logging into the Admin UI

To access the Admin UI:

1. Open your browser and navigate to `http://localhost:4000/ui`
2. Use the **Master Key** as your password (default: `sk-1234` if not set via `LITELLM_MASTER_KEY`)
3. The Master Key is also used for API authentication via the `Authorization: Bearer <master_key>` header

**Note**: Make sure to set a secure `LITELLM_MASTER_KEY` in your `.env` file for production use.

## Usage

This project provides a TypeScript interface for working with LLMs through LiteLLM.

### Basic Usage

#### Using Custom LiteLLM Client

```typescript
import { LiteLLMClient } from './src/client.js';

const client = new LiteLLMClient({
  baseURL: 'http://localhost:4000',
  apiKey: process.env.LITELLM_API_KEY,
});

// Simple completion
const response = await client.complete('What is the capital of France?');

// Chat completion
const chatResponse = await client.chat([
  { role: 'system', content: 'You are a helpful assistant.' },
  { role: 'user', content: 'Explain quantum computing.' },
]);
```

#### Using OpenAI SDK (Recommended)

You can use the official OpenAI npm package with LiteLLM through LiteLLMClient:

```typescript
import { LiteLLMClient } from './src/client.js';

const litellmClient = new LiteLLMClient({
  baseURL: 'http://localhost:4000',
  apiKey: process.env.LITELLM_API_KEY,
});

// Get the underlying OpenAI client for direct SDK access
const client = litellmClient.getOpenAIClient();

const completion = await client.chat.completions.create({
  model: 'gpt-3.5-turbo',
  messages: [{ role: 'user', content: 'What is the capital of France?' }],
});

console.log(completion.choices[0]?.message?.content);
```

The OpenAI SDK provides full TypeScript support and all OpenAI features including streaming, function calling, and more.

### Examples

The project includes 17 examples demonstrating various use cases. Run them directly with `tsx`:

**Custom LiteLLM Client Examples:**

- **Example 1: Basic Completion** - Simple text completion with a single prompt

  ```bash
  tsx examples/01-basic-completion.ts
  ```

- **Example 2: Chat Completion** - Chat with system and user messages

  ```bash
  tsx examples/02-chat-completion.ts
  ```

- **Example 3: Streaming Responses** - Stream responses as they are generated

  ```bash
  tsx examples/03-streaming.ts
  ```

- **Example 4: Multi-Turn Conversation** - Maintain context across multiple messages

  ```bash
  tsx examples/04-conversation.ts
  ```

- **Example 5: Model Selection** - Specify different OpenAI models

  ```bash
  tsx examples/05-model-selection.ts
  ```

- **Example 6: Usage Tracking** - Track token usage for cost estimation

  ```bash
  tsx examples/06-usage-tracking.ts
  ```

- **Example 7: Error Handling** - Handle API errors gracefully

  ```bash
  tsx examples/07-error-handling.ts
  ```

- **Example 8: Structured Output Extraction** - Extract structured data from text

  ```bash
  tsx examples/08-structured-output.ts
  ```

- **Example 9: Code Generation** - Generate code with specific requirements

  ```bash
  tsx examples/09-code-generation.ts
  ```

- **Example 10: Translation** - Use the model for translation tasks

  ```bash
  tsx examples/10-translation.ts
  ```

- **Example 11: Summarization** - Summarize long text into concise summaries

  ```bash
  tsx examples/11-summarization.ts
  ```

- **Example 12: Retry Logic** - Implement retry logic with exponential backoff

  ```bash
  tsx examples/12-retry-logic.ts
  ```

- **Example 13: Prompt Chaining** - Use one LLM response as input to another

  ```bash
  tsx examples/13-prompt-chaining.ts
  ```

- **Example 14: Context Management** - Manage long conversations by truncating old messages

  ```bash
  tsx examples/14-context-management.ts
  ```

- **Example 15: Custom Base URL** - Configure client to use a custom LiteLLM proxy URL

  ```bash
  tsx examples/15-custom-base-url.ts
  ```

- **Example 16: Function Calling** - Use function calling / tool use (advanced feature)

  ```bash
  tsx examples/16-function-calling.ts
  ```

  This example demonstrates accessing advanced OpenAI SDK features (like function calling) that aren't directly exposed by LiteLLMClient's wrapper methods. Use `getOpenAIClient()` to access the underlying OpenAI client when you need full SDK features.

- **Example 17: Sber GigaChat Integration** - Use Sber GigaChat API through LiteLLMClient

  ```bash
  tsx examples/17-gigachat.ts
  ```

  This example demonstrates how to use Sber GigaChat API with LiteLLMClient. Since GigaChat is OpenAI-compatible, we configure LiteLLMClient with GigaChat's base URL. It shows basic chat completion using LiteLLMClient methods, usage tracking, function calling via `getOpenAIClient()`, embeddings, and model listing. The access token is automatically obtained from the authorization key (valid for 30 minutes). Requires `GIGACHAT_AUTH_KEY` environment variable (can be set in `.env` file).

  Documentation: https://developers.sber.ru/docs/ru/gigachat/guides/compatible-openai

## API Reference

### `LiteLLMClient`

```typescript
new LiteLLMClient(config: {
  baseURL?: string; // Optional, defaults to 'http://localhost:4000'
  apiKey?: string; // Optional, LiteLLM master key
  defaultModel?: string; // Optional, defaults to 'gpt-3.5-turbo'
})
```

### `complete(prompt, model?)`

Simple completion with a single prompt.

```typescript
const response = await client.complete('Your prompt here', 'optional-model');
// Returns: string
```

### `chat(messages, model?)`

Chat completion with multiple messages.

```typescript
const response = await client.chat(
  [
    { role: 'system' | 'user' | 'assistant', content: 'message content' },
    // ... more messages
  ],
  'optional-model'
);
// Returns: string
```

### `chatWithUsage(messages, model?)`

Chat completion with token usage information.

```typescript
const result = await client.chatWithUsage(messages, 'optional-model');
// Returns: { content: string; usage?: { prompt_tokens, completion_tokens, total_tokens } }
```

### `streamChat(messages, model?, onChunk?)`

Stream responses as they are generated.

```typescript
const fullResponse = await client.streamChat(messages, 'optional-model', (chunk) => {
  process.stdout.write(chunk);
});
// Returns: string (full response)
```

## Environment Variables

- `LITELLM_BASE_URL` - LiteLLM proxy URL (default: http://localhost:4000)
- `LITELLM_API_KEY` - LiteLLM master key for authentication
- `OPENAI_API_KEY` - OpenAI API key (required for OpenAI models, set in `.env` for Docker Compose)
- `GIGACHAT_AUTH_KEY` - Sber GigaChat API authorization key (required for Example 17, used to automatically obtain access token). Can be set in `.env` file.

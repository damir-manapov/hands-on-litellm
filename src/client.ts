import OpenAI from 'openai';

export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface LiteLLMConfig {
  baseURL?: string | undefined;
  apiKey?: string | undefined;
  defaultModel?: string | undefined;
}

export interface LiteLLMOpenAIConfig {
  baseURL?: string | undefined;
  apiKey?: string | undefined;
}

/**
 * Create an OpenAI client configured to work with LiteLLM proxy
 * @internal - This function is for internal use only
 */
function createLiteLLMClient(config: LiteLLMOpenAIConfig = {}): OpenAI {
  return new OpenAI({
    baseURL: config.baseURL ?? 'http://localhost:4000/v1',
    apiKey: config.apiKey ?? 'sk-1234', // LiteLLM master key
  });
}

export class LiteLLMClient {
  private client: OpenAI;
  private defaultModel: string;

  constructor(config: LiteLLMConfig = {}) {
    const clientConfig: LiteLLMOpenAIConfig = {};
    if (config.baseURL !== undefined) {
      clientConfig.baseURL = config.baseURL;
    }
    if (config.apiKey !== undefined) {
      clientConfig.apiKey = config.apiKey;
    }
    this.client = createLiteLLMClient(clientConfig);
    this.defaultModel = config.defaultModel ?? 'gpt-3.5-turbo';
  }

  /**
   * Get the underlying OpenAI client for direct access to OpenAI SDK features
   */
  getOpenAIClient(): OpenAI {
    return this.client;
  }

  async complete(prompt: string, model?: string): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: model ?? this.defaultModel,
      messages: [{ role: 'user', content: prompt }],
    });

    return response.choices[0]?.message?.content ?? '';
  }

  async chat(messages: Message[], model?: string): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: model ?? this.defaultModel,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    return response.choices[0]?.message?.content ?? '';
  }

  async chatWithUsage(
    messages: Message[],
    model?: string
  ): Promise<{
    content: string;
    usage: { prompt_tokens: number; completion_tokens: number; total_tokens: number } | undefined;
  }> {
    const response = await this.client.chat.completions.create({
      model: model ?? this.defaultModel,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    return {
      content: response.choices[0]?.message?.content ?? '',
      usage: response.usage ?? undefined,
    };
  }

  async streamChat(
    messages: Message[],
    model?: string,
    onChunk?: (chunk: string) => void
  ): Promise<string> {
    const stream = await this.client.chat.completions.create({
      model: model ?? this.defaultModel,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
      stream: true,
    });

    let fullContent = '';

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        fullContent += content;
        onChunk?.(content);
      }
    }

    return fullContent;
  }
}

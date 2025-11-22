import { describe, it, expect } from 'vitest';
import { LiteLLMClient } from '../src/client.js';

describe('LiteLLMClient', () => {
  it('should create a client instance', () => {
    const client = new LiteLLMClient({
      baseURL: 'http://localhost:4000',
    });
    expect(client).toBeInstanceOf(LiteLLMClient);
  });
});

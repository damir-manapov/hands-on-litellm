import { describe, it, expect } from 'vitest';
import { greet } from '../src/index.js';

describe('greet', () => {
  it('should greet the user', () => {
    expect(greet('World')).toBe('Hello, World! Welcome to LiteLLM integration.');
  });
});

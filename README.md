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

## Usage

This project provides a TypeScript interface for working with LLMs through LiteLLM.

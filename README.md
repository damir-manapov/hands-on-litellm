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
2. Optionally create a `.env` file with:
   - `LITELLM_MASTER_KEY` - Master key for LiteLLM (default: sk-1234)
   - `LITELLM_SALT_KEY` - Salt key for encryption (default: sk-5678)
   - `POSTGRES_DB` - PostgreSQL database name (default: litellm)
   - `POSTGRES_USER` - PostgreSQL user (default: litellm_user)
   - `POSTGRES_PASSWORD` - PostgreSQL password (default: litellm_password)

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

#!/bin/bash

set -e

echo "Running formatting..."
pnpm format

echo "Running lint check..."
pnpm lint

echo "Running build check..."
pnpm build

echo "Running gitleaks check..."
if command -v gitleaks >/dev/null 2>&1; then
  gitleaks detect --source . --verbose
else
  echo "Warning: gitleaks not found. Install it from https://github.com/gitleaks/gitleaks"
  exit 1
fi

echo "Running tests..."
pnpm test

echo "All checks passed!"


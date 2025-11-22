#!/bin/bash

set -e

echo "Checking for outdated dependencies..."
OUTDATED=$(pnpm outdated --format json 2>/dev/null || echo "{}")
if [ -n "$OUTDATED" ] && [ "$OUTDATED" != "[]" ] && [ "$OUTDATED" != "{}" ]; then
  echo "Error: Outdated dependencies found:"
  echo "$OUTDATED"
  exit 1
fi

echo "Checking for vulnerabilities..."
if ! pnpm audit --audit-level moderate >/dev/null 2>&1; then
  echo "Error: Vulnerabilities found"
  pnpm audit
  exit 1
fi

echo "All dependencies are up-to-date and secure!"


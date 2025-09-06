#!/usr/bin/env bash
set -euo pipefail

# Sync environment variables from local .env files to Cloudflare Pages project as Secrets.
# Usage:
#   CF_PAGES_PROJECT=<project-name> ./scripts/cf-sync-env.sh all
#   CF_PAGES_PROJECT=<project-name> ./scripts/cf-sync-env.sh production
#   CF_PAGES_PROJECT=<project-name> ./scripts/cf-sync-env.sh preview
#
# Notes:
# - Requires wrangler v3+ logged in: `wrangler login`
# - Reads .env.production and/or .env.preview in repo root
# - Pipes values non-interactively via stdin into `wrangler pages secret put`

PROJECT_NAME="${CF_PAGES_PROJECT:-}"
if [[ -z "$PROJECT_NAME" ]]; then
  echo "CF_PAGES_PROJECT is required (Cloudflare Pages project name)." >&2
  exit 1
fi

TARGET="${1:-all}"
if [[ "$TARGET" != "all" && "$TARGET" != "production" && "$TARGET" != "preview" ]]; then
  echo "Usage: CF_PAGES_PROJECT=<name> $0 [all|production|preview]" >&2
  exit 1
fi

put_env_file() {
  local env_name="$1" # production|preview
  local file="$2"
  if [[ ! -f "$file" ]]; then
    echo "Skip $env_name: $file not found" >&2
    return 0
  fi
  echo "Syncing $env_name from $file ..." >&2
  # shellcheck disable=SC2162
  while IFS= read -r line || [[ -n "$line" ]]; do
    [[ -z "$line" || "$line" =~ ^# ]] && continue
    if [[ "$line" =~ ^([A-Za-z_][A-Za-z0-9_]*)=(.*)$ ]]; then
      key="${BASH_REMATCH[1]}"
      val="${BASH_REMATCH[2]}"
      # strip surrounding quotes if present
      val="${val%\"}"; val="${val#\"}"
      val="${val%\'}"; val="${val#\'}"
      echo -n "$val" | wrangler pages secret put "$key" --project-name "$PROJECT_NAME" --env "$env_name" >/dev/null
      echo "  • $key" >&2
    fi
  done < "$file"
}

if [[ "$TARGET" == "all" || "$TARGET" == "production" ]]; then
  put_env_file production .env.production
fi
if [[ "$TARGET" == "all" || "$TARGET" == "preview" ]]; then
  put_env_file preview .env.preview
fi

echo "Done." >&2


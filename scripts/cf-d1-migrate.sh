#!/usr/bin/env bash
set -euo pipefail

# Apply D1 migrations using wrangler.
# Usage:
#   CF_D1_NAME=<db-name> ./scripts/cf-d1-migrate.sh remote
#   CF_D1_NAME=<db-name> ./scripts/cf-d1-migrate.sh local
#
# Notes:
# - For Cloudflare Pages/Workers, prefer `remote` to run against the hosted DB.
# - Requires wrangler v3+ and an existing D1 database named $CF_D1_NAME.

DB_NAME="${CF_D1_NAME:-}"
if [[ -z "$DB_NAME" ]]; then
  echo "CF_D1_NAME is required (D1 database name)." >&2
  exit 1
fi

MODE="${1:-remote}"
if [[ "$MODE" != "remote" && "$MODE" != "local" ]]; then
  echo "Usage: CF_D1_NAME=<db-name> $0 [remote|local]" >&2
  exit 1
fi

FLAG=( )
if [[ "$MODE" == "remote" ]]; then
  FLAG=( --remote )
fi

for f in migrations/*.sql; do
  [[ -f "$f" ]] || continue
  echo "Applying migration: $f" >&2
  wrangler d1 execute "$DB_NAME" "${FLAG[@]}" --file "$f"
done

echo "D1 migrations completed." >&2


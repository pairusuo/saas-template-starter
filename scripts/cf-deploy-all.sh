#!/usr/bin/env bash
set -euo pipefail

# Build Next.js for Cloudflare Pages (next-on-pages), then deploy
# Production / Preview / All.
#
# Usage:
#   CF_PAGES_PROJECT=<project-name> ./scripts/cf-deploy-all.sh [production|preview|all]
#
# Requirements:
# - pnpm installed
# - wrangler v3+ logged in
# - Environment variables already synced (use scripts/cf-sync-env.sh)

PROJECT_NAME="${CF_PAGES_PROJECT:-}"
if [[ -z "$PROJECT_NAME" ]]; then
  echo "CF_PAGES_PROJECT is required (Cloudflare Pages project name)." >&2
  exit 1
fi

MODE="${1:-all}"
if [[ "$MODE" != "production" && "$MODE" != "preview" && "$MODE" != "all" ]]; then
  echo "Usage: CF_PAGES_PROJECT=<name> $0 [production|preview|all]" >&2
  exit 1
fi

echo "Building Next.js (next-on-pages)..." >&2
pnpm -s cf:build

OUT_DIR=".vercel/output"
if [[ ! -d "$OUT_DIR" ]]; then
  echo "Build output $OUT_DIR not found" >&2
  exit 1
fi

if [[ "$MODE" == "production" || "$MODE" == "all" ]]; then
  echo "Deploying to Production..." >&2
  wrangler pages deploy "$OUT_DIR" --project-name "$PROJECT_NAME"
fi

if [[ "$MODE" == "preview" || "$MODE" == "all" ]]; then
  BRANCH="preview"
  echo "Deploying to Preview (branch=$BRANCH)..." >&2
  wrangler pages deploy "$OUT_DIR" --project-name "$PROJECT_NAME" --branch "$BRANCH"
fi

echo "Deployment(s) completed." >&2

#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <migration-sql-file>"
  exit 1
fi

if [[ -z "${SUPABASE_DB_URL:-}" ]]; then
  echo "Missing SUPABASE_DB_URL environment variable"
  echo "Example: postgresql://postgres:<PASSWORD>@db.uyyirtfrrrvbnntrsplg.supabase.co:5432/postgres"
  exit 1
fi

migration_file="$1"
if [[ ! -f "$migration_file" ]]; then
  echo "Migration file not found: $migration_file"
  exit 1
fi

psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 -f "$migration_file"
echo "Migration applied: $migration_file"

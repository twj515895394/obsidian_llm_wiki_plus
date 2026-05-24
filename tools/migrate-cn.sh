#!/usr/bin/env bash
set -euo pipefail
if [ "$#" -lt 2 ]; then
  echo "Usage: tools/migrate-cn.sh <source-dir> <target-vault> [--apply] [--init-template] [--force]" >&2
  exit 1
fi
SOURCE="$1"
TARGET="$2"
shift 2
python "$(dirname "$0")/migrate.py" --lang CN --source "$SOURCE" --target "$TARGET" "$@"

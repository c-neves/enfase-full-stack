#!/usr/bin/env bash
set -euo pipefail

repository_root="$(git rev-parse --show-toplevel)"

cd "$repository_root/backend/database"
bash scripts/start.bash

cd "$repository_root/backend/graph-api"
bash scripts/start.bash

cd "$repository_root/frontend/web"
bash scripts/start.bash

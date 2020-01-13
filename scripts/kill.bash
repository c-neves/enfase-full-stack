#!/usr/bin/env bash
set -euo pipefail

repository_root="$(git rev-parse --show-toplevel)"

cd "$repository_root/backend/database"
bash scripts/kill.bash

cd "$repository_root/backend/graph-api"
bash scripts/kill.bash

cd "$repository_root/frontend/web"
bash scripts/kill.bash

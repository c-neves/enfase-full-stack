#!/usr/bin/env bash
set -euo pipefail

repository_root="$(git rev-parse --show-toplevel)"

cd "$repository_root/backend/graph-api"
bash scripts/install.bash

cd "$repository_root/frontend/web"
bash scripts/install.bash

#!/usr/bin/env bash
set -euo pipefail

export PACKAGE_ID='backend'

repository_root="$(git rev-parse --show-toplevel)"
_package_root="$repository_root/$PACKAGE_ID"

cd "$_package_root/database"
bash scripts/restart.bash

cd "$_package_root/graph-api"
bash scripts/restart.bash

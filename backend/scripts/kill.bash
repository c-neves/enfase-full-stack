#!/usr/bin/env bash
set -euo pipefail

export PACKAGE_ID='backend'

repository_root="$(git rev-parse --show-toplevel)"
package_root="$repository_root/$PACKAGE_ID"

cd "$package_root/database"
bash scripts/kill.bash

cd "$package_root/graph-api"
bash scripts/kill.bash

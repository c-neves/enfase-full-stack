#!/usr/bin/env bash
set -euo pipefail

export PACKAGE_ID='backend/database'

git_remote_origin_url="$(git config --get remote.origin.url)"
repository_name="$(basename "$git_remote_origin_url" .git)"
repository_root="$(git rev-parse --show-toplevel)"
package_name="$repository_name/$PACKAGE_ID"
package_root="$repository_root/$PACKAGE_ID"
container_name="$(echo "$package_name" | sed 's|/|_|g')"

(echo; set -o xtrace
  cd "$package_root"
  docker exec -i "$container_name" \
    psql -v ON_ERROR_STOP=1 -U enfase -d enfase < src/seed.psql)

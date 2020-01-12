#!/usr/bin/env bash
set -euo pipefail

export PACKAGE_ID='backend/graph-api'

git_remote_origin_url="$(git config --get remote.origin.url)"
repository_name="$(basename "$git_remote_origin_url" .git)"
repository_root="$(git rev-parse --show-toplevel)"
package_name="$repository_name/$PACKAGE_ID"
package_root="$repository_root/$PACKAGE_ID"
container_name="$(echo "$package_name" | sed 's|/|_|g')"
image='node:13.6.0-alpine3.11'

(echo; set -o xtrace
  docker run \
    --name "$container_name" \
    --volume "$package_root:/$package_name" \
    --workdir "/$package_name" \
    --publish 4000:4000 \
    --entrypoint node \
    --rm \
    --detach \
    "$image" \
    scripts/start.js)

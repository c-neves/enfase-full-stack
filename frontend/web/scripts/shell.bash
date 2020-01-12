#!/usr/bin/env bash
set -euo pipefail

export PACKAGE_ID='frontend/web'

git_remote_origin_url="$(git config --get remote.origin.url)"
repository_name="$(basename "$git_remote_origin_url" .git)"
package_name="$repository_name/$PACKAGE_ID"
container_name="$(echo "$package_name" | sed 's|/|_|g')"

# Maintain host user & group.
user="$(id -u):$(id -g)"

(echo; set -o xtrace
  docker exec \
    --user "$user" \
    --interactive \
    --tty \
    "$container_name" \
    sh)

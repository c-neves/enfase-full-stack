#!/usr/bin/env bash
set -euo pipefail

export PACKAGE_ID='frontend/web'

git_remote_origin_url="$(git config --get remote.origin.url)"
repository_name="$(basename "$git_remote_origin_url" .git)"
repository_root="$(git rev-parse --show-toplevel)"
package_name="$repository_name/$PACKAGE_ID"
package_root="$repository_root/$PACKAGE_ID"
container_name="$(echo "$package_name" | sed 's|/|_|g')"
image='node:13.6.0-alpine3.11'

# If user has yarn, get appropriate cache,
# else create a yarn cache for him.
command -v yarn > /dev/null 2>&1 \
  && host_yarn_cache="$(yarn cache dir)" \
  || { host_yarn_cache='~/.cache/yarn'; mkdir -p "$host_yarn_cache"; }

# Get node image's default yarn cache.
container_yarn_cache="$(docker run \
  --entrypoint yarn \
  --rm \
  "$image" \
  cache dir)"

# Maintain host user & group.
user="$(id -u):$(id -g)"

# Mount package root.
# Run yarn install inside container.
(echo; set -o xtrace
  docker run \
    --name "${container_name}_install" \
    --user "$user" \
    --volume "$host_yarn_cache:$container_yarn_cache" \
    --volume "$package_root:/$package_name" \
    --workdir "/$package_name" \
    --entrypoint yarn \
    --rm \
    "$image" \
    install)

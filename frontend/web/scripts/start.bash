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

# TODO: get graph-api env vars.
source "$repository_root/backend/graph-api/scripts/env.bash"
# Rename them for CRA.
export REACT_APP_GRAPH_API_ENDPOINT="http://$GRAPH_API_HOST:$GRAPH_API_PORT"

(echo; set -o xtrace
  docker run \
    --name "$container_name" \
    --volume "$repository_root:/$repository_name" \
    --workdir "/$package_name" \
    --env REACT_APP_GRAPH_API_ENDPOINT \
    --publish 3000:3000 \
    --entrypoint yarn \
    --rm \
    --detach \
    "$image" \
    _start)

# Make sure to exec with host user so generated files belong to host user.
user="$(id -u):$(id -g)"
(echo; set -o xtrace
  docker exec --user "$user" --detach "$container_name" yarn relay)

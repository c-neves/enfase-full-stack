#!/usr/bin/env bash

repository_name='enfase-full-stack'
# Absolute path to the root of the repository.
repository_root="$(git rev-parse --show-toplevel)"

package_name="$repository_name/backend/graph"
package_root="$repository_root/backend/graph"
container_name="$(echo "$package_name" | sed 's|/|_|g')"

(echo; set -o xtrace
  cd "$package_root")

source scripts/kill.bash $container_name || true

source scripts/start.bash $container_name

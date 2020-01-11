#!/usr/bin/env bash

repository_name='enfase-full-stack'
# Absolute path to the root of the repository.
repository_root="$(git rev-parse --show-toplevel)"

package_name="$repository_name/backend/graph"
package_root="$repository_root/backend/graph"
container_name="$(echo "$package_name" | sed 's|/|_|g')"

(echo; set -o xtrace
  cd "$package_root")

(echo; set -o xtrace
  docker run \
    --name "$container_name" \
    --volume "$package_root:/$package_name" \
    --workdir "/$package_name" \
    --publish 4000:4000 \
    --entrypoint node \
    --rm \
    --detach \
    node:13.6.0-alpine3.11 \
    scripts/start.js)

# # Get dynamodb-local container's endpoint.
# container_status() {
#   docker inspect --format '{{ .State.Status }}' $container_name
# }
# until test "$(container_status)" == 'running'; do
#   sleep 0.1s
# done
# container_ip() {
#   docker inspect --format '{{ .NetworkSettings.IPAddress }}' $container_name
# }
# export DYNAMODB_ENDPOINT="http://$(container_ip):8000"
#
# # Convert dynamodb_table.json to AWS Cloud Formation format
# # and create all tables locally.
# echo
# echo "+ $(basename "$node") $(basename "$commit_schema_js") $(basename "$table_json")"
#
# export NODE_OPTIONS="--require $(realpath --relative-to "$PWD" "$_pnp_js")";
# "$node" "$commit_schema_js" "$table_json"
#
# echo
# echo -e "+ ${bold}dynamo is live at ${cyan}$DYNAMODB_ENDPOINT${reset}"

#!/usr/bin/env bash
set -euo pipefail

export PACKAGE_ID='backend/graph-api'

_git_remote_origin_url="$(git config --get remote.origin.url)"
_repository_name="$(basename "$_git_remote_origin_url" .git)"
_package_name="$_repository_name/$PACKAGE_ID"
_container_name="$(echo "$_package_name" | sed 's|/|_|g')"

# Export database info.
ip=$(docker inspect --format '{{ .NetworkSettings.IPAddress }}' "$_container_name" || printf '')
export GRAPH_API_HOST="$ip"
export GRAPH_API_PORT='4000'

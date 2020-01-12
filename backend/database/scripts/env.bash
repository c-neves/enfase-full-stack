#!/usr/bin/env bash
set -euo pipefail

export PACKAGE_ID='backend/database'

_git_remote_origin_url="$(git config --get remote.origin.url)"
_repository_name="$(basename "$_git_remote_origin_url" .git)"
_package_name="$_repository_name/$PACKAGE_ID"
_container_name="$(echo "$_package_name" | sed 's|/|_|g')"

# Export database info.
ip=$(docker inspect --format '{{ .NetworkSettings.IPAddress }}' "$_container_name" || printf '')
export PGHOST="$ip"
export PGDATABASE='enfase'
export PGUSER='enfase'
export PGPASSWORD='654321'

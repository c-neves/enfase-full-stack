# # Get database container's endpoint.
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
# echo
# echo -e "+ ${bold}dynamo is live at ${cyan}$DYNAMODB_ENDPOINT${reset}"

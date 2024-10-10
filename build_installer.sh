docker buildx build --platform linux/amd64,linux/arm64 -t pedasoft/pedavalans:1.0.169 --push .
#docker buildx create --use
#docker stop $(docker ps -a -q)
#docker rm $(docker ps -a -q)
#docker volume rm $(docker volume ls -q)

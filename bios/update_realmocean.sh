npm uninstall @realmocean/sdk && npm install --save-dev @realmocean/sdk@latest
cd ../
./drop_images.sh
docker rmi $(docker images 'realmocean/realmocean' -a -q)
docker-compose up -d
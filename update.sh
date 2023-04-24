#!/bin/bash

docker stop bookshelf
docker rm bookshelf

git pull

docker build . -t bookshelf
docker run -d --name bookshelf -p 8082:3000 --env-file .env bookshelf

docker logs -f bookshelf
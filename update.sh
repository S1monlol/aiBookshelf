#!/bin/bash

docker stop aibookshelf
docker rm aiBookshelf

git pull

docker build . -t aiBookshelf
docker run -d --name aibookshelf -p 8080:3000 --env-file .env aibookshelf

docker logs -f discord-bot-echo
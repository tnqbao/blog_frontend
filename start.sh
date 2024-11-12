#!/bin/sh

git pull origin main

docker stop blog_frontend || true
docker rm blog_frontend || true

docker build -t blog_frontend .

docker run -d --name blog_frontend -p 3005:3005 blog_frontend

docker system prune -a --volumes -f

#!/bin/sh

git pull origin main

docker stop -f blog_frontend
docker run -d -p 3005:3005 blog_frontend
docker system prune -a --volumes -f

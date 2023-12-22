#!/bin/sh
#set -e
 
echo "Efetuando deploy..." 
git fetch origin deploy
git reset --hard origin/main


echo "Reiniciando container docker"
docker compose down && docker compose build && docker compose up -d

echo "Deployed"

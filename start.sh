#!/bin/bash

PROXY_PORT=$PORT
unset PORT

echo $PROXY_PORT
wc nginx/nginx-heroku.conf

cd backend
npm start &
cd ..

sed "s|%PORT%|$PROXY_PORT|g" nginx/nginx-heroku.conf > /etc/nginx/conf.d/default.conf
nginx -g 'daemon off;'

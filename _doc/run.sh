#/var/env/bin sh

API_VERSION=${API_VERSION:-'0.0.1'}
API_HOST=${API_HOST:-'localhost:3000'}

sed -i "s|%API_VERSION%|$API_VERSION|g" /usr/share/nginx/html/swagger.yml
sed -i "s|%API_HOST%|$API_HOST|g" /usr/share/nginx/html/swagger.yml

nginx -g 'daemon off;'

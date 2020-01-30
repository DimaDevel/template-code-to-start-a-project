FROM swaggerapi/swagger-ui:v2.2.9

COPY nginx.conf /etc/nginx/
COPY run.sh /run.sh
COPY . /usr/share/nginx/html

EXPOSE 80

CMD ["sh", "/run.sh"]

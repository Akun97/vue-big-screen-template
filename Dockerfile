ARG BASE_IMAGE
FROM ${BASE_IMAGE}
COPY dist /usr/share/nginx/html
WORKDIR /etc/nginx/conf.d
COPY ./nginx.conf /etc/nginx/nginx.conf.tmpl
EXPOSE 80
CMD /bin/sh -c "DOLLAR='$' envsubst < /etc/nginx/nginx.conf.tmpl > /etc/nginx/nginx.conf && sed -i \"s|<body>|<body \
>|\" /usr/share/nginx/html/index.html && nginx -g 'daemon off;' || cat /etc/nginx/nginx.conf"
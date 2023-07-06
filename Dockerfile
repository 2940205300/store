FROM nginx
RUN mkdir /usr/share/nginx/dist \
    && rm -rf /etc/nginx/nginx.conf \
    && /bin/cp /usr/share/zone /etc/localtime \
    && echo 'Asia/Shanghai' >/etc/timezone
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./dist/ /usr/share/nginx/dist
EXPOSE 8080

FROM busybox
MAINTAINER  Igor Moochnick <igor@igorshare.com>

ADD <%- version %>/<%- pkg_name %>-<%- version %>.tar.gz /usr/share/nginx/<%- pkg_name %>/
RUN mv /usr/share/nginx/<%- pkg_name %>/dist /usr/share/nginx/html
WORKDIR /usr/share/nginx/html/
VOLUME /usr/share/nginx/html/

RUN chown -R root:root .

FROM alpine

RUN apk add npm && npm i express && npm i jsonwebtoken && npm i multer && npm i body-parser

VOLUME /home/master-stub

WORKDIR /home/master-stub

COPY ./ /home/master-stub/

EXPOSE 8080

CMD node index
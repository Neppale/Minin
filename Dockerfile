FROM node:alpine3.16

WORKDIR /app

USER 1000

COPY --chown=node:node . ./

RUN chmod +x /app/docker-entrypoint.sh

RUN npm install && \
    npm run build

EXPOSE 5000

ENTRYPOINT ["/app/docker-entrypoint.sh"]

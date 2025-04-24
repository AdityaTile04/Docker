FROM node

ENV MONGO_DB_USERNAME=aditya \
    MONGO_DB_PWD=secret
RUN mkdir -p demo/node_app

COPY . /demo/node_app

CMD ["node", "demo/node_app/server.js"]

EXPOSE 3000 
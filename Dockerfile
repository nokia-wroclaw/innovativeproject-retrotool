FROM node:6.10

EXPOSE 3000

COPY meteor-build/bundle/ /home/node/bundle
RUN chown -hR node /home/node/bundle

USER node
RUN (cd /home/node/bundle/programs/server && npm install)

CMD ["node", "/home/node/bundle/main.js"]

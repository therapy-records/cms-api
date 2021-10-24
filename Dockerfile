FROM node:14
RUN mkdir -p /
WORKDIR /
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]

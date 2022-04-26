FROM node:alpine

WORKDIR /api

COPY ["package*.json" , "."]
RUN npm install --silent

COPY . .

CMD ["node", "dist/server.js"]

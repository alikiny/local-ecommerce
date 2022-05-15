FROM node:alpine

WORKDIR /api

COPY ["package*.json" , "."]
RUN npm install 

COPY . .

CMD ["node", "dist/server.js"]

FROM node:alpine

WORKDIR /

COPY ["package.json" , "."]
RUN npm install 

COPY . .

CMD ["node", "dist/server.js"]

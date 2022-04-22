FROM node:alpine

WORKDIR /api

COPY package*.json ./
RUN npm install --silent; npm install react-scripts --silent

COPY . .

CMD ["npm", "start"]

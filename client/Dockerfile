# pull official base image
FROM node:alpine
ENV NODE_ENV development

# set working directory 
WORKDIR /client

# add app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install 



# Copy app file
COPY . ./
# Expose port

# Start the app
CMD ["npm", "start"]

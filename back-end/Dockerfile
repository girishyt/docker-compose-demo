#pull a node image from docker hub
FROM node:12.13.1-alpine

#set the working dir to /app
WORKDIR /app

#copy the package.json file which will install all the dependencies.
COPY package*.json ./

RUN npm install
#If you are building your code for production
#RUN npm ci --only=production

# Bundle app source
COPY . .

#expose port 3000 to mount it to another port in local machine 
EXPOSE 3000

#Start the server
CMD [ "node", "index.js" ]
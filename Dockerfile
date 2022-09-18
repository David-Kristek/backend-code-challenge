FROM node:16-alpine
RUN npm install -g nodemon
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 4000
CMD ["npm", "start"]

FROM node:latest

RUN mkdir -p /app/frontend
WORKDIR /app/frontend

COPY package.json /app/frontend
COPY package-lock.json /app/frontend

RUN npm install

COPY . /app/frontend

CMD ["npm", "run", "serve"]

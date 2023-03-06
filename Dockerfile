FROM node:16.13-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --ignore-scripts --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]

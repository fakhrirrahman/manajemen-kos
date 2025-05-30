FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps --network-timeout=100000

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start"]

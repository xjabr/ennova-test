FROM node:16

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . ./

RUN npm run build

CMD ["node", "build/src/main.js"]
EXPOSE 5000
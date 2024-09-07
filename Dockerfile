FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG NODE_ENV
RUN npm run build

ENV NODE_ENV=${NODE_ENV:-production}

CMD [ "sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then npm run start:prod; else npm run dev; fi" ]

FROM node:18-slim
WORKDIR /home/node/blog_frontend

COPY package*.json ./
COPY tsconfig.json ./
COPY yarn.lock ./
COPY next-i18next.config.js ./
COPY . .

RUN yarn install --frozen-lockfile

RUN yarn build

RUN yarn install --production --frozen-lockfile

EXPOSE 3005

CMD ["yarn", "start"]

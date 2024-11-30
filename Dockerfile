FROM node:18-slim
WORKDIR /home/node/blog_frontend

COPY package.json yarn.lock tsconfig.json next-i18next.config.js next.config.mjs ./
COPY .env.production .env
COPY ./public ./public
COPY ./src ./src


RUN npm install --global yarn
RUN yarn install --frozen-lockfile

RUN yarn build

RUN yarn install --production --frozen-lockfile

EXPOSE 3005

CMD ["yarn", "start"]

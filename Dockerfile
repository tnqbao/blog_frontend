#step1: build
FROM node:18-slim AS builder
WORKDIR /home/node/blog_frontend
COPY package*.json ./
COPY tsconfig.json ./
COPY yarn.lock ./
COPY next-i18next.config.js ./
COPY . .
COPY .env.production .env
RUN npm install --force --global yarn
RUN npm install --force --global ts-node
RUN npm install --force --global typescript
RUN yarn install --check-files
RUN yarn build

#step2: production
FROM node:18-slim AS production
WORKDIR /home/node/blog_frontend
COPY --from=builder /home/node/blog_frontend/.next ./.next
COPY --from=builder /home/node/blog_frontend/public ./public
COPY --from=builder /home/node/blog_frontend/package.json ./
COPY --from=builder /home/node/blog_frontend/yarn.lock ./
COPY --from=builder /home/node/blog_frontend/next-i18next.config.js ./
RUN yarn install --production --frozen-lockfile
COPY .env.production .env
EXPOSE 3005
CMD ["yarn", "start"]
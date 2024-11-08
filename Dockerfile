# build
FROM node:18-slim AS builder
WORKDIR /home/node/blog_frontend
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# serve for deployment
FROM node:18-slim AS production
WORKDIR /home/node/blog_frontend
COPY --from=builder /home/node/blog_frontend/.next ./.next
COPY --from=builder /home/node/blog_frontend/public ./public
COPY --from=builder /home/node/blog_frontend/package.json ./
COPY --from=builder /home/node/blog_frontend/yarn.lock ./

RUN yarn install --production --frozen-lockfile
COPY .env.production .env
EXPOSE 3005
CMD ["yarn", "start"]

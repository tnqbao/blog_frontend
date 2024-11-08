# build
FROM node:18-slim
WORKDIR /home/node/blog_frontend
COPY package*.json ./
COPY tsconfig.json ./
COPY yarn.lock ./
COPY . .
COPY .env.production .env
RUN npm install --force --global yarn
RUN npm install --force --global ts-node
RUN npm install --force --global typescipt
RUN yarn install --check-file
RUN yarn build
# serve for deployment
#FROM node:18-slim AS production
#WORKDIR /home/node/blog_frontend
#COPY --from=builder /home/node/blog_frontend/.next ./.next
#COPY --from=builder /home/node/blog_frontend/public ./public
#COPY --from=builder /home/node/blog_frontend/package.json ./
#COPY --from=builder /home/node/blog_frontend/yarn.lock ./
#RUN yarn install --production --frozen-lockfile

EXPOSE 3005
CMD ["yarn", "start"]

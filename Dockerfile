FROM node:16-alpine as build

WORKDIR /app

COPY ["package*.json", "yarn.lock", "db.json", "./"]
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

RUN yarn install --production && yarn cache clean

USER node

FROM node:16-alpine

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/db.json ./db.json
COPY --from=build /app/dist ./dist

CMD ["yarn", "start:prod"]
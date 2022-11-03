FROM node:16-alpine AS build
LABEL author="Ridwan Ikhsan"
WORKDIR /usr/src/app/
COPY package.json yarn.lock /usr/src/app/
RUN yarn install --frozen-lockfile
COPY . /usr/src/app/
ARG DATABASE_URL
ENV DATABASE_URL $DATABASE_URL
RUN yarn build
RUN chmod -R 777 /usr/src/app/

FROM node:16-alpine AS app
WORKDIR /usr/src/app/
COPY --from=build /usr/src/app/dist ./
COPY --from=build /usr/src/app/node_modules ./node_modules
CMD node start

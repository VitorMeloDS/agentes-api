FROM node:18.17.1-alpine3.18 AS dev
WORKDIR /usr/src/app

# Copy files
COPY ./package.json .
COPY ./package-lock.json .
COPY ./tsconfig.json .
COPY ./tsconfig.build.json .

# Install dependencies
RUN npm install

EXPOSE 3000

CMD ["npm","run","start:dev"]
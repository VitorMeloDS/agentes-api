FROM node:18.18.2-alpine as dev
WORKDIR /app

# Copy files
COPY ./package.json .
COPY ./package-lock.json .
COPY ./tsconfig.json .
COPY ./tsconfig.build.json .

# Install dependencies
RUN npm install

EXPOSE 3000

CMD ["npm","run","start:dev"]
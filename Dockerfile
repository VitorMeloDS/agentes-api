FROM node:18.17.1-alpine3.18 AS dev
WORKDIR /usr/src/app

# Copy files
COPY ./package.json .
COPY ./package-lock.json .

# Install dependencies
RUN npm install

EXPOSE 3000

CMD ["npm","run","start:dev"]

# ===================================
FROM node:18.17.1-alpine3.18 AS build

WORKDIR /usr/src/app

# Copy files
COPY ./package.json .
COPY ./package-lock.json .

# Install dependencies
RUN npm install

# Copy remaining files
COPY ./tsconfig.json .
COPY ./tsconfig.build.json .
COPY ./nest-cli.json .
COPY ./src ./src

# Build the app
RUN npm run build --prod

# Production stage
FROM node:22-alpine3.20 AS prod

WORKDIR /usr/src/app

# Copy from build stage
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/package-lock.json ./package-lock.json

# Install only production dependencies
RUN npm install --omit=dev

# Update packages
RUN apk update && apk upgrade

# Expose the port
EXPOSE 3000

# Run the application
CMD ["sh", "-c", "node dist/main"]
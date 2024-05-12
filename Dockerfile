FROM node:alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
FROM node:alpine
COPY --from=builder .env .dockerignore
COPY src/ .
EXPOSE 3000
CMD [ "node", "src/index.js"]
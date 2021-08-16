FROM node:12 as base

# Create app directory
WORKDIR /udemyDocker

COPY package.json package.json
COPY package-lock.json package-lock.json

FROM base as test
RUN npm ci
COPY . .
RUN npm run test

FROM base as prod
RUN npm ci --production
COPY . .

EXPOSE 3000
CMD [ "node", "app.js" ]
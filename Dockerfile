FROM node:14.15.0-alpine3.10 AS base
RUN mkdir /app && chown -R node:node /app 
WORKDIR /app 
ARG APP_PORT                       # <-- these two lines have
ENV APP_PORT=$APP_PORT
COPY --chown=node:node package.json package-lock*.json ./
COPY --chown=node:node . .
ENV PATH=/app/node_modules/.bin:$PATH
RUN npm install
RUN npm install -g typescript
USER root
CMD ["npm","start"]
EXPOSE 8000
EXPOSE 8080
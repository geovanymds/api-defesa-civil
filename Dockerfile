FROM node:14.15.0-alpine3.10 AS base
RUN mkdir /app && chown -R node:node /app 
WORKDIR /app 
COPY --chown=root:node package.json package-lock*.json ./
COPY --chown=root:node . .
ENV PATH=/app/node_modules/.bin:$PATH
RUN npm install
RUN npm install -g typescript
USER node
CMD ["npm","start"]
EXPOSE 8000
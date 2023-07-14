FROM node:18-alpine

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /usr/src/app

COPY . .

# ! This line could break your this code
# RUN apk add --update npm

RUN  npm install


USER appuser

EXPOSE 3000
CMD [ "node", "index.js" ]
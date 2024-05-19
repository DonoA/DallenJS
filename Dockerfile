FROM --platform=linux/amd64 node:20-alpine

WORKDIR /app
COPY .next/standalone .

ENV NODE_ENV production
ENV PORT 3000
CMD HOSTNAME="0.0.0.0" node server.js
EXPOSE 3000

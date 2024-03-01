FROM node:18-alpine

WORKDIR /app

COPY package*.json .
COPY ./src ./src
COPY ./prisma ./prisma
COPY ./tsconfig.json .
COPY ./tsconfig.build.json .
COPY ./nest-cli.json .

RUN npm install && npx prisma generate && npm run build

EXPOSE 8080

CMD ["sh", "-c", "npx prisma migrate deploy && npm run seed && npm run start:prod"]
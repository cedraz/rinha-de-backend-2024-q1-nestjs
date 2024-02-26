FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install && npx prisma generate

COPY . .

EXPOSE 8080

CMD ["sh", "-c", "npx prisma migrate deploy && npm run seed && npm run start:dev"]

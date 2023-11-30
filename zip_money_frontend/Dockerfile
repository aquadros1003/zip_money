FROM node:20-bullseye

WORKDIR /app

COPY . /app

ENV NODE_ENV=production

RUN npm install serve -g

RUN npm install --include=dev

EXPOSE 3000

CMD ["npm", "run", "dev"]
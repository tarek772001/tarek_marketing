FROM node:18-alpine 

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# add this line to change the permission of uploads folder
RUN chmod -R 777 /app/uploads

EXPOSE 5000

CMD ["node","server"] && ["node","seeder"]

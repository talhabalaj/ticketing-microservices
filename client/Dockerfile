FROM node:alpine  

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm i 
COPY . . 

CMD ["npm", "run", "dev"]
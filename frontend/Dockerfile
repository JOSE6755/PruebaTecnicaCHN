FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

# Comando de desarrollo
CMD ["npm", "run", "dev"]

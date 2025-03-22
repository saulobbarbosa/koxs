# Usa uma imagem base do Node.js para build
FROM node:latest AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do package.json e instala dependências
COPY package*.json ./
RUN npm install

# Copia os arquivos do projeto
COPY . .

# Gera os arquivos estáticos do React
RUN npm run build

# Usa Nginx para servir a aplicação React
FROM nginx:alpine

# Copia os arquivos do build para a pasta padrão do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 6050

# Comando para rodar o Nginx
CMD ["nginx", "-g", "daemon off;"]

FROM node:15-alpine

#EQUIVALENT AU  "CD", mais a l'intérieur d'un container
WORKDIR /usr/src/app

# Copie des fichiers package.json et package-lock.json de mon dossier actuel
#vers le container (dans le WORKDIR)
COPY package*.json ./

#Une fois que les fichiers packages sont copiés, je peux éxecuter la commande npm install
RUN npm install

# Copie de tous les fichiers du projet dans le container
COPY .. .

EXPOSE 4000
CMD ["node","index.js"]
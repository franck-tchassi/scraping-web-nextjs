# Alert : prendre les informations de connexion de la base de donnée et le mettre dans le fichier  ** .env ** en dessous

# 🚀 Scraper LeBonCoin : Vélo Électrique
Ce projet permet de scraper les 10 annonces les plus récentes de vélos électriques sur LeBonCoin en utilisant Next.js, Prisma(ORM avec postgreSQL), Puppeteer.
![image](https://github.com/user-attachments/assets/86a0c73f-ba38-4819-8fab-50aab9cbd47e)
![image](https://github.com/user-attachments/assets/81f9bafe-aec8-4c16-985c-ca05d98199c0)
![image](https://github.com/user-attachments/assets/6f372838-6d0c-4a88-99c1-2db9e939915d)



## 🔑 Configuration des variables d’environnement
Avant de lancer le projet, configure ton fichier .env :
Base de données PostgreSQL
**DATABASE_URL="postgresql://postgres:12Abcdef%40@localhost:5432/leboncoin-scraping"**


## 📌 Fonctionnalités
✅ Scrape les 10 annonces les plus récentes de vélos électriques sur LeBonCoin.
✅ Stocke les résultats dans une base de données PostgreSQL via Prisma ORM.
✅ Automatisation de l'envoi de messages aux vendeurs.
✅ Contournement des restrictions et optimisation du scraping après la détection de plusieurs systèmes anti-bot.


## 🛠️ Technologies utilisées
Next.js : Framework React pour l'interface utilisateur.
Prisma : ORM pour interagir avec PostgreSQL.
Puppeteer : Automatisation du navigateur pour scraper les annonces.
PostgreSQL : Base de données pour stocker les annonces récupérées.


## 🚀 Installation et exécution
1️⃣ Installation des dépendances
Assure-toi d’avoir Node.js installé, puis exécute :
**npm install**
**npx prisma migrate dev --name init**
**npm run dev**

## 📡 Fonctionnement du Scraper
1️⃣ Accès aux annonces de vélos électriques sur LeBonCoin.
2️⃣ Filtrage des 10 annonces les plus récentes.
3️⃣ Stockage des résultats dans PostgreSQL via Prisma.
4️⃣ Automatisation de l’envoi de messages aux vendeurs.

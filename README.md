# Alert : prendre les informations de connexion de la base de donnée et de brightdata le mettre dans le fichier  ** .env **


# 🚀 Scraper LeBonCoin : Vélo Électrique
Ce projet permet de scraper les 10 annonces les plus récentes de vélos électriques sur LeBonCoin en utilisant Next.js, Prisma, Puppeteer et BrightData.

## 📌 Fonctionnalités
✅ Scrape les 10 annonces les plus récentes de vélos électriques sur LeBonCoin.
✅ Stocke les résultats dans une base de données PostgreSQL via Prisma.
✅ Automatisation de l'envoi de messages aux vendeurs.
✅ Utilisation de BrightData pour contourner les restrictions et améliorer le scraping.


## 🛠️ Technologies utilisées
Next.js : Framework React pour l'interface utilisateur.
Prisma : ORM pour interagir avec PostgreSQL.
Puppeteer : Automatisation du navigateur pour scraper les annonces.
BrightData : Proxy pour contourner les restrictions du site.
PostgreSQL : Base de données pour stocker les annonces récupérées.


## 🔑 Configuration des variables d’environnement
Avant de lancer le projet, configure ton fichier .env :

Base de données PostgreSQL
**DATABASE_URL="postgresql://postgres:12Abcdef%40@localhost:5432/leboncoin-scraping"**

Clé API BrightData (remplace par ta propre clé)
**BRIGHTDATA_AUTH="brd-customer-hl_e889d317-zone-scraping_browser1:5kyjbxj9c4bt"**


## 🚀 Installation et exécution
1️⃣ Installation des dépendances
Assure-toi d’avoir Node.js installé, puis exécute :
**npm install**
**npx prisma migrate dev --name init**
**npm run dev**

## 📡 Fonctionnement du Scraper
1️⃣ Connexion à BrightData via Puppeteer.
2️⃣ Accès aux annonces de vélos électriques sur LeBonCoin.
3️⃣ Filtrage des 10 annonces les plus récentes.
4️⃣ Stockage des résultats dans PostgreSQL via Prisma.
5️⃣ Automatisation de l’envoi de messages aux vendeurs.

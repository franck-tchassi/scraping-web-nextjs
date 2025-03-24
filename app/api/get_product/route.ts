import puppeteer, { Browser } from 'puppeteer';
import { NextResponse } from "next/server";
import { Bike } from '@prisma/client';
import { prisma } from '@/lib/prisma';

const URL = "https://www.leboncoin.fr/recherche?category=55&text=velo+electrique&kst=r&from=rs";

export const GET = async (req: Request, res: Response) => {
    const browser = await puppeteer.launch({
        headless: true, 
        args: [
            "--no-sandbox", // Sécuriser le processus
            "--disable-setuid-sandbox", // Désactiver l'accès pour certains utilisateurs
            "--disable-blink-features=AutomationControlled" // Contourner certaines détections de bot
        ]
    });

    const bikes = await getLeboncoinProducts(browser);
    
    await prisma.bike.createMany({
        data: bikes,
    }); 

    await browser.close();

    return NextResponse.json({
        bikes,
    });
};

const getLeboncoinProducts = async (instance: Browser) => {
    const page = await instance.newPage();

    // Ajouter un user-agent pour simuler un vrai utilisateur
    await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    // Ajouter des headers HTTP pour simuler une requête d'un vrai utilisateur
    await page.setExtraHTTPHeaders({
        "accept-language": "fr-FR,fr;q=0.9,en;q=0.8",
    });


    // Charger la page
    await page.goto(URL, { waitUntil: 'networkidle2'});

    // Scraper les produits une fois que l'élément est disponible
    const bikes = await page.$$eval("li", rows => {
        return rows.map(row => {
            const obj = {
                title: "",
                price: "",
                link: "",
                logo: "",
                date: new Date()
            } as Bike;

            const pTitle = row.querySelector("article p[data-test-id='adcard-title']");
            if (pTitle) {
                obj.title = pTitle.textContent?.trim() ?? "N/A";
            }

            const pPriceElement = row.querySelector('p[data-test-id="price"]');
            if (pPriceElement) {
                const pPrice = pPriceElement.querySelector("span");
                obj.price = pPrice?.textContent?.trim() ?? "N/A";
            }

            const divLogoElement = row.querySelector('div[data-test-id="image"]');
            if (divLogoElement) {
                const imgLogo = divLogoElement.querySelector('img');
                obj.logo = imgLogo?.getAttribute('src') ?? "N/A";
            }

            const linkElement = row.querySelector('article[data-qa-id="aditem_container"]');
            if (linkElement) {
                const link = linkElement.querySelector("a");
                obj.link = link?.href ?? "N/A";
            }

            

            // Récupérer la date via aria-label
            const dateElement = row.querySelector('[aria-label^="Date de dépôt :"]');
            if (dateElement) {
                const ariaLabel = dateElement.getAttribute('aria-label');
                if (ariaLabel) {
                    // Extraire la date du format "Date de dépôt : 10/03/2025"
                    const dateString = ariaLabel.replace("Date de dépôt : ", "").trim();
                    const [day, month, year] = dateString.split('/');
                    const parsedDate = new Date(`${year}-${month}-${day}`);
                    if (!isNaN(parsedDate.getTime())) {
                        obj.date = parsedDate;
                    }
                }
            }

            return obj;
        });
    });

    // Filtrer les résultats pour ne garder que ceux avec un titre
    const bikeFilter = bikes.filter((bike) => {
        if (!bike) return false;
        if (!bike.title) return false;
        return true;
    });

    // S'assurer que toutes les dates sont valides
    bikeFilter.forEach(bike => {
        if (!bike.date || !(bike.date instanceof Date) || isNaN(bike.date.getTime())) {
            bike.date = new Date(); // Date par défaut si invalide
        }
    });

    // Trier les vélos par date décroissante
    bikeFilter.sort((a, b) => {
        return b.date.getTime() - a.date.getTime(); // Tri décroissant
    });

    // Retourner les 10 vélos les plus récents
    return bikeFilter.slice(0, 10);
};
"use server";

import puppeteer from "puppeteer-core";

const BROWSER_WS = `wss://${process.env.BRIGHTDATA_AUTH}@brd.superproxy.io:9222`;

export async function sendAutomatedMessages() {
    const productLink = "https://www.leboncoin.fr/ad/velos/2944635016";
    const message = "Bonjour, je suis intéressé par votre vélo !";
    const email = "juliettepascalo77@gmail.com";  // 🔄 Remplace avec tes identifiants
    const password = "12Abcdef@";

    console.log("🔗 Connexion au navigateur via WebSocket...");
    const browser = await puppeteer.connect({ browserWSEndpoint: BROWSER_WS });

    const page = await browser.newPage();

    try {
        await page.goto(productLink, { waitUntil: "networkidle2", timeout: 60000});

        const contactButton = await page.$('button[data-test-id="contact-button"]');
        if (!contactButton) throw new Error("❌ Bouton 'Contacter' introuvable !");
        await contactButton.click();

        await page.waitForSelector("input[name='email'], textarea[name='body']", { visible: true });

        const isLoginRequired = await page.$("input[name='email']");
        if (isLoginRequired) {
            console.log("🔑 Connexion requise...");

            await page.type("input[name='email']", email);
            await page.click('button[data-testid="login-continue-button"]');
            await page.waitForSelector("input[name='password']", { visible: true });

            await page.type("input[name='password']", password);
            await page.click('button[data-testid="submitButton"]');

            await page.waitForNavigation({ waitUntil: "networkidle2" ,timeout: 60000});
            console.log("✅ Connexion réussie !");
        }

        await page.goto(productLink, { waitUntil: "networkidle2", timeout: 60000 });
        await page.waitForSelector('button[data-test-id="contact-button"]', { visible: true });

        const contactButtonAfterLogin = await page.$('button[data-test-id="contact-button"]');
        if (!contactButtonAfterLogin) throw new Error("❌ Impossible de cliquer sur 'Contacter' après connexion !");
        await contactButtonAfterLogin.click();

        await page.waitForSelector('textarea[name="body"]', { visible: true });
        await page.type('textarea[name="body"]', message);
        await page.click('button[type="submit"]');

        // ✅ Correction : Remplace `waitForTimeout` par `setTimeout`
        await new Promise(resolve => setTimeout(resolve, 5000));

        console.log("✅ Message envoyé avec succès !");

    } catch (error: any) {
        console.error("❌ Erreur :", error.message);
    } finally {
        await browser.disconnect();
    }
}

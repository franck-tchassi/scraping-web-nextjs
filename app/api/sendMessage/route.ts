import { NextResponse } from "next/server";
import puppeteer from "puppeteer-extra";

export async function POST(req: Request) {
  const { productLink, message, email, password } = await req.json();

  if (!productLink || !message || !email || !password) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }

  console.log("Lancement du navigateur...");

  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  try {
    // Simuler un vrai navigateur
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );
    await page.setExtraHTTPHeaders({ "Accept-Language": "fr-FR,fr;q=0.9" });

    // Ajouter le cookie Datadome (copie depuis ton navigateur)
    await page.setCookie({
      name: "datadome",
      value: "68YHRS5P99KYiOwJPnIzr8AdTIc675mVBI0by0cpLA0OwYK6UAfhlwfz2X~ykNVpsipb_RPCjSis3CuMredv0ym7CZWHX9WLOnQo6lYTvnxlspy5CNSPE4rbXpbYZ5yM",
      domain: ".leboncoin.fr",
    });

    console.log("Navigation vers l'annonce...");
    await page.goto(productLink, { waitUntil: "networkidle2", timeout: 60000 });

    console.log("Vérification du bouton 'Contacter'...");
    const contactButton = await page.$('button[data-pub-id="adview_button_contact_contact"]');

    if (!contactButton) {
      console.log("Bouton 'Contacter' introuvable, la session est peut-être expirée.");
      
      // Essai de connexion
      console.log("Connexion requise, relancement de la session...");
      await page.goto("https://www.leboncoin.fr/account", { waitUntil: "networkidle2" });

      const emailInput = await page.$("input[name='email']");
      if (!emailInput) throw new Error("Champ email introuvable, Leboncoin a peut-être bloqué l'accès.");

      await page.type("input[name='email']", email);
      await page.click('button[data-testid="login-continue-button"]');
      await page.waitForSelector("input[name='password']", { visible: true });

      await page.type("input[name='password']", password);
      await page.click('button[data-testid="submitButton"]');

      // Attendre la redirection après connexion
      await page.waitForNavigation({ waitUntil: "networkidle2", timeout: 60000 });
      console.log("Connexion réussie !");

      // Revenir sur l'annonce après connexion
      await page.goto(productLink, { waitUntil: "networkidle2" });

      // Vérifier si le bouton "Contacter" est maintenant présent
      const contactButtonAfterLogin = await page.$('button[data-pub-id="adview_button_contact_navbar"]');
      if (!contactButtonAfterLogin) throw new Error("Toujours impossible de contacter après connexion !");
      await contactButtonAfterLogin.click();
    } else {
      await contactButton.click();
    }

    console.log("Rédaction du message...");
    await page.waitForSelector('textarea', { visible: true });
    await page.type('textarea', message);
    await page.click('button[data-test-id="send-message"]');

    console.log("Message envoyé avec succès !");
    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error: any) {
        console.error("Erreur :", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
        await browser.close();
  }
}

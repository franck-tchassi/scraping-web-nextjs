"use client";
import { useState } from "react";
import { Pencil } from 'lucide-react';
import { Mail } from 'lucide-react';
import { KeyRound } from 'lucide-react';
import { Link } from 'lucide-react';

const  LeboncoinMessenger = () =>{
  const [productLink, setProductLink] = useState("https://www.leboncoin.fr/ad/velos/2886267644");
  const [message, setMessage] = useState("Bonjour, Votre annonce m'intéresse. Est-il toujours disponible ? Si oui, pourriez-vous me donner plus d’informations sur son état et les modalités de remise en main propre ou d’envoi ? Merci d’avance pour votre retour.");
  const [email, setEmail] = useState("juliettepascalo77@gmail.com");
  const [password, setPassword] = useState("12Abcdef@");
  const [status, setStatus] = useState("");

  const sendMessage = async () => {
    setStatus("Envoi du message en cours...");

    try {
      const response = await fetch("/api/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productLink, message, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("Message envoyé avec succès !");
      } else {
        setStatus(`Erreur : ${data.error}`);
      }
    } catch (error) {
      setStatus("Erreur de connexion au serveur.");
    }
  };

  return (
    <div className="flex flex-col text-center gap-4 py-32 max-w-4xl  m-auto ">
      <h2 className="text-2xl font-bold mb-4 underline">Envoyer des messages automatique aux Vendeurs</h2>

      <div className="flex flex-col items-start gap-2 mb-4">
        <label className="font-medium flex gap-2"><Link /> Lien de l'annonce :</label>
        <input
          type="text"
          value={productLink}
          onChange={(e) => setProductLink(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="https://www.leboncoin.fr/..."
        />
      </div>

      <div className="flex flex-col items-start gap-2 mb-4">
        <label className="font-medium flex gap-2"><Mail /> Email :</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Votre email"
        />
      </div>

      <div className="flex flex-col items-start gap-2 mb-4">
        <label className="font-medium flex gap-2"><KeyRound /> Mot de passe :</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Votre mot de passe"
        />
      </div>

      <div className="flex flex-col items-start gap-2 mb-4">
        <label className=" font-medium flex gap-2"><Pencil /> Message :</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border rounded"
          rows={3}
          placeholder="Votre message ici..."
        ></textarea>
      </div>

      <button
        onClick={sendMessage}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer"
      >
        Envoyer
      </button>

      {status && <p className="mt-4 text-center font-bold">{status}</p>}
    </div>
  );
}

export default LeboncoinMessenger
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { nom, email, message } = req.body;

  try {
    await resend.emails.send({
      from: "DM Photographie  <contact@leslieewane.ca>",  // IMPORTANT
      to: "essongewane@gmail.com",
      subject: "📸 Nouveau message du formulaire",
      text: `Nom : ${nom}\nEmail : ${email}\n\nMessage :\n${message}`
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Erreur API Resend:", error); // Debug
    return res.status(500).json({ error: "Échec de l'envoi", details: error });
  }
}


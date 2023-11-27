import twilio from "twilio";
import dotenv from 'dotenv';
dotenv.config();

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Fonction pour envoyer un SMS
export async function sendSMS(to, body) {
  try {
    const message = await twilioClient.messages.create({
      to: to, // Le numéro de téléphone auquel envoyer le SMS
      from: process.env.TWILIO_PHONE_NUMBER, // Votre numéro de téléphone Twilio
      body: body // Le message que vous souhaitez envoyer
    });
    console.log(message.sid);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

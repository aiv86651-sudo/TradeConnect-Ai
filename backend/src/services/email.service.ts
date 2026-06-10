import { config } from '../config';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Resend } = require('resend');

const resend = config.resend.apiKey ? new Resend(config.resend.apiKey) : null;

export const sendEmail = async (to: string, subject: string, html: string) => {
  if (!resend) {
    throw new Error('Resend API key is missing. Please configure it in the .env file.');
  }
  
  const result = await resend.emails.send({
    from: config.resend.fromEmail,
    to,
    subject,
    html: `<div style="font-family: Arial; line-height:1.6">${html.replace(/\n/g, "<br>")}</div>`,
  });
  return result;
};

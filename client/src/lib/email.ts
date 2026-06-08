import { sendEmailFn } from "../../../server/api/email";

export async function sendEmail(to: string, subject: string, html: string) {
  return await sendEmailFn({ data: { to, subject, html } });
}
import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmailFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const d = data as { to: string; subject: string; html: string };
    if (!d.to || !d.subject || !d.html) throw new Error("Missing email fields");
    return d;
  })
  .handler(async ({ data }) => {
    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM || "TradeConnect AI <onboarding@resend.dev>",
      to: data.to,
      subject: data.subject,
      html: `<div style="font-family: Arial; line-height:1.6">${data.html.replace(/\n/g, "<br>")}</div>`,
    });
    return result;
  });
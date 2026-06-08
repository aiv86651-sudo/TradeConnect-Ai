import { createServerFn } from "@tanstack/react-start";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const makeCallFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const d = data as { phone: string; script: string };
    if (!d.phone || !d.script) throw new Error("Phone and script required");
    return d;
  })
  .handler(async ({ data }) => {
    const call = await client.calls.create({
      to: data.phone,
      from: process.env.TWILIO_PHONE_NUMBER!,
      twiml: `<Response><Say voice="alice">${data.script}</Say></Response>`,
    });
    return { success: true, callSid: call.sid };
  });
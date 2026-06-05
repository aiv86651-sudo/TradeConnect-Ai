import express from "express";
import cors from "cors";
import { Resend } from "resend";
import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const app = express();

app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/send-email", async (req, res) => {
  try {
    console.log("EMAIL API HIT");

    const { to, subject, html } = req.body;

    console.log(to, subject);

    const data = await resend.emails.send({
      from: "TradeConnect AI <onboarding@resend.dev>",
      to,
      subject,
      html: `
<div style="font-family: Arial; line-height:1.6">
  ${html.replace(/\n/g, "<br>")}
</div>
`,
    });

    console.log(data);

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

app.post("/call-lead", async (req, res) => {
  try {
    const { phone, name, script } = req.body;

  

    const call = await client.calls.create({
      to: phone,
      from: process.env.TWILIO_PHONE_NUMBER,

      //       twiml: `
      // <Response>
      // <Say voice="alice">
      // ${script}
      // </Say>
      // </Response>
      // `,
      twiml: `
<Response>
<Say voice="alice">
Hello Dinesh.

This is a custom AI script test.

TradeConnect AI is calling you.

Thank you.
</Say>
</Response>
`,
    });

    res.json({
      success: true,
      callSid: call.sid,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on 5000");
});

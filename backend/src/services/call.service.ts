import twilio from 'twilio';
import { config } from '../config/index.js';

const client = (config.twilio.accountSid && config.twilio.authToken) 
  ? twilio(config.twilio.accountSid, config.twilio.authToken) 
  : null;

export const makeCall = async (phone: string, script: string) => {
  if (!client) {
    throw new Error('Twilio credentials are missing. Please configure them in the .env file.');
  }

  const call = await client.calls.create({
    to: phone,
    from: config.twilio.phoneNumber!,
    twiml: `<Response><Say voice="alice">${script}</Say></Response>`,
  });
  return call;
};

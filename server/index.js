import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import twilio from 'twilio';
import sg from '@sendgrid/mail';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const twilioSid = process.env.TWILIO_ACCOUNT_SID || '';
const twilioToken = process.env.TWILIO_AUTH_TOKEN || '';
const twilioFrom = process.env.TWILIO_FROM || '';
const client = twilioSid && twilioToken ? twilio(twilioSid, twilioToken) : null;

const sendgridKey = process.env.SENDGRID_API_KEY || '';
if (sendgridKey) sg.setApiKey(sendgridKey);

app.get('/health', (_, res) => res.json({ ok: true }));

app.post('/api/send-sms', async (req, res) => {
  try {
    if (!client) return res.status(400).json({ error: 'Twilio not configured' });
    const { to, body } = req.body || {};
    if (!to || !body) return res.status(400).json({ error: 'Missing to/body' });
    const resp = await client.messages.create({ to, from: twilioFrom, body });
    res.json({ ok: true, sid: resp.sid });
  } catch (e) {
    res.status(500).json({ error: e.message || 'Failed' });
  }
});

app.post('/api/send-email', async (req, res) => {
  try {
    if (!sendgridKey) return res.status(400).json({ error: 'SendGrid not configured' });
    const { to, subject, text } = req.body || {};
    if (!to || !subject || !text) return res.status(400).json({ error: 'Missing to/subject/text' });
    const msg = {
      to,
      from: process.env.SENDGRID_FROM || 'no-reply@zyvastra.com',
      subject,
      text,
    };
    const resp = await sg.send(msg);
    res.json({ ok: true, id: resp[0]?.headers?.['x-message-id'] || 'ok' });
  } catch (e) {
    res.status(500).json({ error: e.message || 'Failed' });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
}); 
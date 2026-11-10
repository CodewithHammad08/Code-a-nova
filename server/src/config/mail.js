const nodemailer = require('nodemailer');
const config = require('./environment');

let transporter = null;

const createMailTransporter = async () => {
  if (transporter) return transporter;

  const { host, port, secure, user, pass } = config.email;

  if (user && pass) {
    try {
      transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: {
          user,
          pass,
        },
      });

      // Verify connection configuration
      await transporter.verify();
      console.log('[Mail] SMTP Transporter ready and verified with configured credentials.');
      return transporter;
    } catch (err) {
      console.warn(`[Mail] Configured SMTP verification failed: ${err.message}. Falling back to resilient mode.`);
    }
  }

  // If no credentials or verification failed, provide a test/fallback transporter
  console.log('[Mail] Notice: Real SMTP credentials not provided or unverified. Emails will be logged to console.');
  transporter = {
    isMock: true,
    sendMail: async (mailOptions) => {
      console.log('--------------------------------------------------');
      console.log(`[MAIL DISPATCHED - CODE-A-NOVA]`);
      console.log(`To: ${mailOptions.to}`);
      console.log(`Subject: ${mailOptions.subject}`);
      console.log(`From: ${mailOptions.from || config.email.from}`);
      console.log(`Text preview: ${mailOptions.text ? mailOptions.text.slice(0, 150) : 'HTML email'}`);
      console.log('--------------------------------------------------');
      return {
        messageId: `mock-${Date.now()}@codeanova.local`,
        response: 'Logged to server console (Mock/Dev Transporter)',
      };
    },
  };

  return transporter;
};

module.exports = {
  getTransporter: createMailTransporter,
};

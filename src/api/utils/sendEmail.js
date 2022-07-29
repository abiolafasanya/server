import nodemailer from 'nodemailer';

const sendEmail = async ({ subject, text, to }) => {
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  var mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  await transport.sendMail(mailOptions);
};

export default sendEmail;

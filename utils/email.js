import nodemailer from 'nodemailer';
import nodemailerSendgrid from 'nodemailer-sendgrid';
import dotenv from 'dotenv';
dotenv.config();

export const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey: process.env.SENDGRID_API_KEY,
    })
  );

  const emailOptions = {
    from: 'ecommerce <omaresmail706@gmail.com>',
    to: options.email,
    subject: options.subject,
    // text: options.message,
    templateId: 'd-fc1a90d41e594a188218c24e03063276', // Use your dynamic template ID
    dynamic_template_data: {
      name: options.name, // Pass dynamic data here
      resetURL: options.resetURL,
    },
  };

  await transporter.sendMail(emailOptions);
};
